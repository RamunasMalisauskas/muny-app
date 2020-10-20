⚜️ Muny-app ⚜️

  / Muny-app is created for you to track your expenses and income
  

  ⚙️ Built With:
  
  / Used VUE.js framework
  
  / Firebase Auth for user DB validation and managment
  
  / Firebase Firestore for the general database
  
  / Bulma.css for the project grid and components
  
  

🧿 Starter pack 🧿

  🪁 Demo version login:
  
  / email: test@test.com
  
  / password: test123
  

  💾 Installation on your device:
  
  / Clone the reposiory 
  
    -> git clone https://github.com/RamunasMalisauskas/muny-app.git
    
  / Install NPM packages 
  
    -> npm i
  / Create new Firebase web project and and copy the SDK config into project
  
    -> src/services/firebase-prod.js
    
  / In your new Firebase project enable authentification by email and password and google
  
  / Create a Firestore database and set the DB rules to your preferance
  


⚡️ Usage ⚡️

  / Register your income
    -> you can choose type of income (card/cash) and add short description for later
  / Add your expenses 
    -> inputs are same as the income plus you select group of spending for in depth tracking
  / Track your transfers in Log page
    -> you can select transfer period
    -> you can edit/delete every entry
  / Get summary 
    -> you can get your overall balance 
    -> currently working on expenses group precental visualisations
