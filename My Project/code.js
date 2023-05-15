// Create lists that contain the information of class names and grade, assignment names and weight,
// and lists that organize information collected throughout the operation of the program


var classNameList = [];
var currentGradeList = [];
var assignmentNameList = [];
var assignmentWeightList = [];


var organizedList = [];
var organizedWeightList = [];


// When the Start and Back Buttons are clicked, they must change the display to its appropriate screen
// and play a sound indicating that the screen has changed.

onEvent("startButton", "click", function(){
  setScreen("organizeScreen");
  dropdown("classdropdown", "Classes");
  setPosition("classdropdown", 20, 175, 115, 30);
});

onEvent("backButton", "click", function(){
  setScreen("homeScreen");
  deleteElement("classdropdown");
});

// When resetbutton is clicked, the inputs will clear and the lists will reset

onEvent("resetbutton", "click", function(){
  clearScreen();
  reset();
});

// When "organizebutton" is clicked, the "weightdata" text area will display all of the weights that
// you inputted into the program and pair those weights with the count of the amount of assignments
// are worth each weight.

onEvent("organizebutton", "click", function(){
  elementCount();
});

// When "addImage" is clicked, "classInput" and "gradeInput" will be added to "organizedList"
// in the format: classInput: gradeInput, and options will be added to "classdropdown" which will
// be the text from "classInput".

onEvent("addImage", "click", function(){
 var newItem = getText("classInput") + ": " + getNumber("gradeInput");
 appendItem(classNameList, getText("classInput"));
 appendItem(currentGradeList, getNumber("gradeInput")); 
 appendItem(organizedList, newItem);
 setProperty("classdropdown", "options", classNameList);
 clearScreen();
 updatedata();
});

// When "addImage2" is clicked, the option selected from "classdropdown" and the text from "assignmentNameInput" and 
// "weightInput" will be added to "organizedWeightList" in the format: option, assignmentName: weightInput%,
// then the inputs will be cleared of all texts and numbers.

onEvent("addImage2", "click", function(){
  var newitem = getText("classdropdown") + ", " + getText("assignmentNameInput") + ": " + getText("weightInput") + "%";
  appendItem(assignmentNameList, getText("assignmentNameInput"));
  appendItem(assignmentWeightList, getNumber("weightInput"));
  appendItem(organizedWeightList, newitem);
  updateWeight();
  clearScreen();
});


// The updatedata function joins the information from the organizedList with the information on the
// "datatable" text area with the seperation of a new line.

function updatedata(){
  setText("datatable", organizedList.join("\n "));
}

// The updateWeight function joins the information from the organizedWeightList with the information on the
// "weightdata" text area with the seperation of a new line.

function updateWeight(){
  setText("weightdata", organizedWeightList.join("\n "));
}

// The clearScreen function removes the texts from all of the inputs and leaves them blank.

function clearScreen(){
  setText("classInput", "");
  setText("gradeInput", "");
  setText("assignmentNameInput", "");
  setText("weightInput", "");
}

// The reset function removes all of the data from all of the lists in the program and the table inputs.

function reset(){
  removeItem(classNameList, classNameList.length - 1);
  removeItem(currentGradeList, currentGradeList.length -1);
  removeItem(assignmentNameList, assignmentNameList.length -1);
  removeItem(assignmentWeightList, assignmentWeightList.length -1);
  removeItem(organizedList, organizedList.length -1);
  removeItem(organizedWeightList, organizedWeightList.length -1);
  setText("datatable", "");
  setText("weightdata", "");
  setText("classdropdown", "");
}

// The elementCount function counts the amount of occurences of a specific number in an array
// (the array defined takes from the data in the assignmentWeightList), and adds the result to an object
// in the format: {"number", occurrences}. The function then uses JSON.stringify to make the object a 
// string so we can delete the information present in the "weightdata" text area, and then 
// take the information from the string and display it in the "weightdata" text area.

// The parameter being used is (text) and is used as a variable to contain the data from the result string. 

function elementCount(text){
  var arr      = assignmentWeightList;
  var result = {};
  for(var i = 0; i < arr.length; ++i) {
      if(!result[(arr[i])])
          result[arr[i]] = 0;
      ++(result[(arr[i])]);
}
  text = JSON.stringify(result);
  setText("weightdata", text);
}

