import axios from 'axios'

const fetchMusclesGroupImg = async (primaryMuscleGroups, secondaryMuscleGroups) => {
   const options = {
      method: 'GET',
      url: 'https://muscle-group-image-generator.p.rapidapi.com/getMulticolorImage',
      params: {
         primaryColor: '240,100,80',
         secondaryColor: '200,100,80',
         primaryMuscleGroups: primaryMuscleGroups,
         secondaryMuscleGroups: secondaryMuscleGroups,
         transparentBackground: '0',
      },
      responseType: 'arraybuffer',
      headers: {
         'X-RapidAPI-Key': '14b8eccabcmsha2eda835da87d52p1ce5c5jsn27276cf68176',
         'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
      },
   }

   try {
      const response = await axios.request(options)
      const imageFile = new Blob([response.data])
      return URL.createObjectURL(imageFile)
   } catch (error) {
      console.error(error)
   }
}

export default fetchMusclesGroupImg
