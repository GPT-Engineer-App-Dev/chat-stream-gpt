/*
Use like this:
import { create } from 'lib/openai';

const res = await create({messages: [{role: 'system', content: 'What is the capital of France?'}], model: 'gpt-3.5-turbo'}})
console.log(res.data.choices[0].message.content);

// with streaming
const res = await create({messages:[{role: 'system', content: 'What is the capital of France?'}], model: 'gpt-3.5-turbo', 'stream': true})

for (const message of res.data.choices) {
  console.log(message.message.content);
}
*/


import OpenAI from 'openai';


export const create = async ({messages, model, stream}) => {
  const openai = new OpenAI({baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID});
  return await openai.chat.completions.create({
    messages,
    model,
    stream
  });
}


