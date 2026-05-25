function getResourceList () {
  let result = [];

  let options = app.plugins.plugins.dataview.api
  .pages(`"3 Resources"`)
  .where(p => p.para == "resource")

  options.forEach((option) => {
    result.push(`${option.file.name}`)
  })
  result.sort();

  result.forEach(addPrefix);
  function addPrefix(item, index, a) {
    switch(a[index])
    {
      // 2 Areas
      case "Career Planning": prefix = "🇬🇧 ";
      break; 
      case "Drawing": prefix = "🎨 ";
      break; 
      case "Finance": prefix = "🏦 ";
      break;
      case "Goal Setting": prefix = "🎯 ";
      break;
      case "Hobbies": prefix = "⛷️ ";
      break;
      case "Interpersonal": prefix = "🎭 ";
      break;
      case "Job Searching": prefix = "🕵🏻‍♀️ ";
      break; 
      case "Life Success": prefix = "😎 ";
      break; 
      case "Personal Development": prefix = "🌱 ";
      break; 
      case "Pet": prefix = "🐣 ";
      break; 
      case "Professional Development": prefix = "👩🏻‍💼 ";
      break; 
      case "Reading": prefix = "📖 ";
      break; 
      case "Travel": prefix = "🏖️ ";
      break;
      
      // 3 Resources
      case "Acupuncture": prefix = "📍 ";
      break;
      case "Beauty": prefix = "✨ ";
      break; 
      case "Clothing": prefix = "👕 ";
      break;
      case "Coding Practice": prefix = "👩‍💻 ";
      break;
      case "Computer Science": prefix = "💻 ";
      break;
      case "Cooking": prefix = "👩🏻‍🍳 ";
      break;
      case "Data Analytics": prefix = "💻 ";
      break;
      case "Data Engineering": prefix = "💻 ";
      break;
      case "Data Science": prefix = "💻 ";
      break;
      case "DataCamp": prefix = "💻 ";
      break;
      case "English": prefix = "🇬🇧 ";
      break;
      case "Entertainment": prefix = "🍿 ";
      break;
      case "Lifestyle": prefix = "💖 ";
      break;
      case "Meditate": prefix = "🧘🏻‍♀️ ";
      break;
      case "Habit Formation": prefix = "🔄 ";
      break;
      case "People": prefix = "👯‍♀️ ";
      break;
      case "Personal Knowledge Management": prefix = "🧠 ";
      break;
      case "Personality Test": prefix = "🧒🏻 ";
      break;
      case "Photo": prefix = "📸 ";
      break;
      case "Productivity": prefix = "🔝 ";
      break;
      case "Project Management": prefix = "‍💼 ";
      break;
      case "Psychology": prefix = "💜 ";
      break;
      case "Quotes": prefix = "®️ ";
      break;
      case "Scripts & Tools": prefix = "⚙️ ";
      break;
      case "Software Development": prefix = "⚙️ ";
      break;
      case "Spanish": prefix = "🇪🇸 ";
      break;
      case "Style": prefix = "😎 ";
      break;
      case "Technical Analysis": prefix = "📈 ";
      break;
      case "中醫": prefix = "㊥ ";
      break;
      case "穴位": prefix = "📍 ";
      break;
      case "經絡": prefix = "🔀 ";
      break;

      // Potential
      case "Gaming": prefix = "👾 ";
      break; 
      case "Health": prefix = "🌳 ";
      break; 
      
      default: prefix = ""
    }
    a[index] = prefix + item
  }
  
  return result
}
module.exports = getResourceList;

// [[<% tp.system.suggester(tp.user.getResourceList(), tp.user.getResourceListValue(), false, "Resource") %>]]

/*********** version 1.0 ***********/
// function getResourceList () {
//     let result = [];

//     let options = app.plugins.plugins.dataview.api
//     .pages(`"3 Resources"`)
//     .where(p => p.type == "resource")

//     options.sort();

//     options.forEach((option) => {
//       switch(option.file.name)
//       {
//         case "Clothing": prefix = "👕 ";
//         break;
//         case "Drawing": prefix = "🎨 ";
//         break; 
//         case "Expressing": prefix = "🎭 ";
//         break; 
//         case "Entertainment": prefix = "🍿 ";
//         break; 
//         case "Travel": prefix = "🏖️ ";
//         break;
//         case "Gaming": prefix = "👾 ";
//         break; 
//         case "Personal Knowledge Management": prefix = "🧠 ";
//         break; 
//         case "Scripts & Tools": prefix = "⚙️ ";
//         break; 
//         case "Computer Science": prefix = "💻 ";
//         break;
//         case "Data Analytics": prefix = "💻 ";
//         break;
//         case "Data Engineering": prefix = "💻 ";
//         break;
//         case "Data Science": prefix = "💻 ";
//         break;
//         default: prefix = ""
//       }
      
//       result.push(`${prefix}${option.file.name}`)
//     })

//     return result
// }
// module.exports = getResourceList;

/*********** version 2.0 ***********/
// function getResourceList () {
//   let result = [];

//   let options = app.plugins.plugins.dataview.api
//   .pages(`"3 Resources"`)
//   .where(p => p.type == "resource")

//   options.forEach((option) => {
//     result.push(`${option.file.name}`)
//   })

//   result.sort();

//   return result
// }
// module.exports = getResourceList;
