import express from "express";
import fetch from "node-fetch"; // or native fetch in Node 18+
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "YOUR_OPENAI_KEY";

app.post("/api/ask", async (req,res) => {
  const {prompt} = req.body;
  if(!prompt) return res.status(400).json({error:"No prompt provided"});

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:[{role:"user", content:prompt}],
        max_tokens:150
      })
    });
    const data = await r.json();
    const answer = data.choices[0].message.content;
    res.json({answer});
  } catch(e){
    console.error(e);
    res.status(500).json({error:"Failed to get AI response"});
  }
});

app.listen(3000, ()=>console.log("Server running on port 3000"));
