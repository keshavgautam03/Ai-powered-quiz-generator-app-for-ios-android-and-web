// --- API Configuration and Schema Definitions ---

// The API Key will be automatically provided by the environment if left as an empty string.
const apiKey = "AIzaSyCvrYNuTLYijbqWj2y-8HrEvEtv6SPvJ94";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

// Since we cannot use Zod's .jsonSchema() method here, we define the required
// Gemini JSON schema manually based on the original Zod definitions.

/** * Original Zod Schema:
 * const QuizQuestionsSchema = z.object({
 * questions: z.array(z.object({
 * id: z.string(),
 * question: z.string(),
 * options: z.array(z.string()).length(4),
 * correctAnswer: z.number().min(0).max(3),
 * explanation: z.string().optional(),
 * })).length(5),
 * })
 */
const quizQuestionsJsonSchema = {
  type: "OBJECT",
  properties: {
    questions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          question: { type: "STRING" },
          options: {
            type: "ARRAY",
            items: { type: "STRING" },
            // Note: Array length constraint is handled by the prompt for the model
          },
          correctAnswer: { type: "INTEGER" },
          explanation: { type: "STRING" },
        },
        required: ["id", "question", "options", "correctAnswer", "explanation"],
      },
    },
  },
  required: ["questions"],
};

/** * Original Zod Schema:
 * const FeedbackSchema = z.object({
 * feedback: z.string(),
 * encouragement: z.string(),
 * suggestions: z.array(z.string()).optional(),
 * })
 */
const feedbackJsonSchema = {
  type: "OBJECT",
  properties: {
    feedback: { type: "STRING" },
    encouragement: { type: "STRING" },
    suggestions: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
  },
  required: ["feedback", "encouragement"],
};

// Minimal type definition for reference (assuming it's imported from somewhere else)
/**
 * @typedef {object} QuizQuestion
 * @property {string} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctAnswer
 * @property {string} [explanation]
 */

// --- API Helper Functions ---

/**
 * Helper function to handle the fetch request with exponential backoff.
 * @param {object} payload - The body of the API request.
 * @param {number} retryCount - Current retry attempt.
 * @param {number} maxRetries - Maximum number of retries allowed.
 * @returns {Promise<object>} The parsed JSON object from the model response.
 */
async function fetchGeminiApi(payload, retryCount, maxRetries) {
  if (retryCount > 0) {
    const delay = 1000 * (retryCount ** 2); // Exponential backoff
    console.log(`[Gemini] Waiting ${delay}ms before retry ${retryCount}...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API call failed with status ${response.status}: ${errorBody}`);
  }

  const result = await response.json();
  const textContent = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error("Gemini response was empty or malformed.");
  }

  // The text content should be a valid JSON string due to responseMimeType
  return JSON.parse(textContent);
}


/**
 * Generates a set of multiple choice quiz questions on a given topic using the Gemini API.
 * @param {string} topic - The subject of the quiz.
 * @param {number} [retryCount=0] - Current retry attempt.
 * @returns {Promise<QuizQuestion[]>} An array of 5 quiz questions.
 */
export async function generateQuizQuestions(topic, retryCount = 0) {
  const maxRetries = 3;

  const userQuery = `Generate 5 multiple choice questions about ${topic}. 
  Each question must be clear, educational, have exactly 4 options (index 0 to 3), and include a brief explanation.
  Ensure questions are diverse, moderately challenging, and test different knowledge areas within the topic.
  The correct answer index must be an integer between 0 and 3.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: quizQuestionsJsonSchema,
      temperature: 0.7,
    },
    systemInstruction: {
      parts: [{ text: "You are an expert quiz question generator. Your only task is to generate five multiple-choice questions in the requested JSON structure." }]
    }
  };

  try {
    console.log("[Gemini] Generating quiz questions for topic:", topic);
    const resultObject = await fetchGeminiApi(payload, retryCount, maxRetries);

    if (resultObject && resultObject.questions) {
      console.log("[Gemini] Successfully generated", resultObject.questions.length, "questions");
      return resultObject.questions;
    }
    throw new Error("Generated object was missing the 'questions' array.");
  } catch (error) {
    console.error("[Gemini] Error generating quiz questions:", error);
    if (retryCount < maxRetries) {
      return generateQuizQuestions(topic, retryCount + 1);
    }
    throw new Error("Failed to generate quiz questions after multiple attempts. Please try again.");
  }
}

/**
 * Generates personalized feedback based on the quiz score using the Gemini API.
 * @param {string} topic - The subject of the quiz.
 * @param {number} score - The number of correct answers.
 * @param {number} totalQuestions - The total number of questions.
 * @param {number} [retryCount=0] - Current retry attempt.
 * @returns {Promise<string>} The personalized feedback string.
 */
export async function generateFeedback(
  topic,
  score,
  totalQuestions,
  retryCount = 0,
) {
  const maxRetries = 2;
  const percentage = Math.round((score / totalQuestions) * 100);

  const userQuery = `Generate personalized feedback for a quiz about ${topic}. 
  The user scored ${score} out of ${totalQuestions} questions (${percentage}%).
  
  Provide encouraging and constructive feedback that:
  - Acknowledges their performance level appropriately.
  - Offers specific insights about their knowledge in ${topic}.
  - Suggests areas for improvement if score is below 80%.
  - Celebrates strong performance if score is 80% or above.
  - Remains positive and motivating.
  - Is concise (2-3 sentences for 'feedback' and 'encouragement' fields).
  - Include 1-3 specific 'suggestions' for further learning.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: feedbackJsonSchema,
      temperature: 0.7,
    },
    systemInstruction: {
      parts: [{ text: "You are a kind and insightful educational coach providing motivational feedback in the requested JSON structure." }]
    }
  };

  try {
    console.log("[Gemini] Generating feedback for score:", score, "/", totalQuestions, `(${percentage}%)`);
    const resultObject = await fetchGeminiApi(payload, retryCount, maxRetries);

    // We only return the main feedback string, matching the original function's return type.
    if (resultObject && resultObject.feedback) {
      console.log("[Gemini] Successfully generated personalized feedback");
      return resultObject.feedback;
    }
    throw new Error("Generated object was missing the 'feedback' field.");

  } catch (error) {
    console.error("[Gemini] Error generating feedback:", error);
    if (retryCount < maxRetries) {
      return generateFeedback(topic, score, totalQuestions, retryCount + 1);
    }

    // Fallback feedback based on performance (kept from original code)
    if (percentage >= 80) {
      return `Excellent work on the ${topic} quiz! You scored ${score} out of ${totalQuestions}, demonstrating strong knowledge in this area. Keep up the great learning!`;
    } else if (percentage >= 60) {
      return `Good job completing the ${topic} quiz! You scored ${score} out of ${totalQuestions}. Consider reviewing the areas you missed to strengthen your understanding.`;
    } else {
      return `Thanks for taking the ${topic} quiz! You scored ${score} out of ${totalQuestions}. This is a great starting point - review the explanations and try again to improve your knowledge.`;
    }
  }
}
