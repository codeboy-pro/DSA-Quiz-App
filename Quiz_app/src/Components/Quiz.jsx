
// echo "# DSA-Quiz-App" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/codeboy-pro/DSA-Quiz-App.git
// git push -u origin main



import React, { use, useRef, useState } from "react";
import "./Quiz.css";

import { data } from "../assets/data";
const Quiz = () => {
  let [index, setindex] = useState(0);
  let [question, setquestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let [result,setresult]=useState(false);
  let option_array = [option1, option2, option3, option4];

  const cherckAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setlock(true);
        option_array[question.ans - 1].current.classList.add("Correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if(index===data.length-1){
        setresult(true);
        return 0;
      }
      setindex(++index);
      setquestion(data[index]);
      setlock(false);
      option_array.map((option)=>{
        option.current.classList.remove("Wrong");
        option.current.classList.remove("Correct");
      })
    }
  };
  const reset=()=>{
    setindex(0);
    setquestion(data[0]);
    setscore(0);
    setlock(false);
    setresult(false);


  }
  return (
    <div className="container">
      <h1>DSA Quiz App</h1>
      <hr />
      {result?<>
        <h2>You SCored {score} out of {data.length}</h2>
        <div className="reset_div">
  <button onClick={reset} className="reset">Reset</button>
  </div>
      </>:<>    <h2>
        {index + 1}.{question.question}
      </h2>
      <ul>
        <li
          ref={option1}
          onClick={(e) => {
            cherckAns(e, 1);
          }}
        >
          A.{question.option1}
        </li>
        <li
          ref={option2}
          onClick={(e) => {
            cherckAns(e, 2);
          }}
        >
          B.{question.option2}
        </li>
        <li
          ref={option3}
          onClick={(e) => {
            cherckAns(e, 3);
          }}
        >
          C.{question.option3}
        </li>
        <li
          ref={option4}
          onClick={(e) => {
            cherckAns(e, 4);
          }}
        >
          D.{question.option4}
        </li>
      </ul>
      <button className="next" onClick={next}>Next</button>
         <div>
        {index + 1} of {data.length} quistions
      </div>
      </>}

   
    </div>
  );
};

export default Quiz;
