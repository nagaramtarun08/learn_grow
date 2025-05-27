import React from 'react';

    const API_KEY = 'AIzaSyAryL_4PndnVUWMACpk2pvQFgAYj3ad9y8';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    export const generateCareerPath = async (hobbies, careerAspirations = "") => {
      const prompt = `
        Based on the following hobbies: ${hobbies.join(', ')} ${careerAspirations ? `and career aspirations: "${careerAspirations}"` : ''}, generate a comprehensive career path suggestion.
        The response MUST be a valid JSON object. Do NOT include any markdown formatting like \`\`\`json or \`\`\` at the beginning or end of the JSON output.
        The JSON object should have the following structure:
        {
          "path_name": "Suggested Career Path Name",
          "description": "A brief description of why this career is suitable based on the hobbies and aspirations. This should be engaging and encouraging.",
          "skills_required": [
            "Essential Skill 1 (e.g., JavaScript)",
            "Essential Skill 2 (e.g., Problem Solving)",
            "Essential Skill 3 (e.g., UI/UX Basics)"
          ],
          "potential_roles": [
            "Entry-Level Role Example",
            "Mid-Level Role Example",
            "Senior-Level Role Example"
          ],
          "estimated_salary_range": "e.g., $50,000 - $70,000 (Entry Level)",
          "learning_resources": {
            "online_courses": [
              { "title": "Real Existing Online Course 1 Name (e.g., Complete Web Developer Zero to Mastery)", "link": "https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/", "platform": "Udemy" },
              { "title": "Real Existing Online Course 2 Name (e.g., Google UX Design Professional Certificate)", "link": "https://www.coursera.org/professional-certificates/google-ux-design", "platform": "Coursera" }
            ],
            "youtube_videos": [
              { "title": "Specific & Real YouTube Video Title 1 (e.g., Learn JavaScript - Full Course for Beginners)", "link": "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
              { "title": "Specific & Real YouTube Video Title 2 (e.g., What is UX Design? (Explained by a UX Designer))", "link": "https://www.youtube.com/watch?v=c9H3_1gQ9jU" }
            ],
            "ebooks": [
              { "title": "Real E-book Title 1 (e.g., Eloquent JavaScript)", "link": "https://eloquentjavascript.net/", "author": "Marijn Haverbeke" },
              { "title": "Real E-book Title 2 (e.g., Don't Make Me Think, Revisited)", "link": "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515", "author": "Steve Krug" }
            ]
          },
          "recommended_trainers": [
            { "name": "John Doe (Placeholder)", "specialization": "Web Development Expert", "contact_info": "johndoe@example.com (placeholder)", "profile_url": "#" },
            { "name": "Jane Smith (Placeholder)", "specialization": "UX Design Mentor", "contact_info": "janesmith@example.com (placeholder)", "profile_url": "#" }
          ],
          "suggested_tasks": [
            { "title": "Complete 'Hello World' in HTML/CSS/JS", "description": "Set up your first web page.", "difficulty": "Beginner" },
            { "title": "Build a Simple To-Do List App", "description": "Practice DOM manipulation and basic logic.", "difficulty": "Beginner" },
            { "title": "Create a Personal Portfolio Website", "description": "Showcase your projects and skills.", "difficulty": "Intermediate" }
          ],
          "achievements_and_badges": [
            { "name": "Coding Novice", "description": "Awarded for completing your first coding task.", "icon": "Code" },
            { "name": "Project Starter", "description": "Awarded for starting your first significant project.", "icon": "Rocket" },
            { "name": "Course Completer - Web Basics", "description": "Awarded for finishing an introductory web development course.", "icon": "Award" }
          ]
        }
        Ensure all recommended courses, YouTube videos, and e-books are real, existing resources and provide direct, valid URLs.
        Trainer recommendations can be placeholders for now.
        Tasks should be actionable and progress in difficulty.
        Achievements should be motivating.
        The entire output must be a single, valid JSON object.
      `;

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Gemini API Error:', errorData);
          throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          const rawJson = data.candidates[0].content.parts[0].text;
          try {
            return JSON.parse(rawJson);
          } catch (parseError) {
            console.error("Failed to parse Gemini API response:", parseError, "Raw response:", rawJson);
            throw new Error("Invalid JSON response from AI. The AI returned: " + rawJson.substring(0, 200) + "...");
          }
        } else {
          console.error("Unexpected response structure from Gemini API:", data);
          throw new Error("Could not extract career path from AI response.");
        }
      } catch (error) {
        console.error('Error generating career path:', error);
        throw error;
      }
    };