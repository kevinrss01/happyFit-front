// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'

export default function handler(req, res) {
   fs.readFile('./src/data/fakeData.json', 'utf8', (err, jsonString) => {
      if (err) {
         res.status(400).json('No data found')
         return
      }
      res.status(200).json(JSON.parse(jsonString))
   })
}
