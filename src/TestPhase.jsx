
import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { questionOrder, vignette } from './randomized-parameters';
import Likert from 'react-likert-scale';
import { useCopyEventDetector } from './CopyPasteDetectors';
import { likertChoicesTest } from './likertScale';
import kraemer_a from './kraemer_a.svg';
import kraemer_b from './kraemer_b.svg';

import Data from './Data';

const TestPhase = (props) => {

    // detect if participants use CTRL-C
    const copyCount = useCopyEventDetector();

    // import some relevant props
    const testData = props.testData;
    const name=testData.name;
    const dv=testData.dv;
    

    // initialize variables
    const [responseIntentionality, setResponseIntentionality] = useState(0);
    const [responseCausation, setResponseCausation] = useState(0);
    const [responseKnowHow, setResponseKnowHow] = useState(0);
    const [responseProbRaising, setResponseProbRaising] = useState(0);

    const [sad, setSad] = useState(0);
    const [pathnumber, setPathnumber] = useState(0);
    const [ballcolor, setBallcolor] = useState(0);
    const [displayButton, setDisplayButton] = useState(0);

    

    const handleSad = (e) => {
        setSad(e.target.value);
    };

    const handlePathnumber = (e) => {
        setPathnumber(e.target.value);
    };

    const handleBallcolor = (e) => {
        setBallcolor(e.target.value);
    };

    useEffect(() => {
        // go to top of the screen
            window.scrollTo(0, 0);
        }, []); 


    const handleClick = () => {
        // stores relevant data to the Data object
        // (you should replace '42' with the relevant data to be exported)
        Data.responses.push({
            trialNumber: props.testNumber,
            intentionality: responseIntentionality,
            causation: responseCausation,
            knowHow: responseKnowHow,
            probRaising: responseProbRaising,
            sad: sad,
            pathnumber: pathnumber,
            ballcolor: ballcolor,
            condition: dv,
            vignette: vignette,
            copyCount: copyCount
        })
        Data.trialData.push({
            trialNumber: props.testNumber,
        })
        //console.log(Data);
        // increment the trial number so as to go to the next trial
        props.incrementTest(props.testNumber)
    }

    // is the reminder text at the top visible
    const reminderViz = props.testNumber === 0 ? 'hidden' : 'visible';
    // reminder text
    // note that throughout we use testNumber % 2 to compute whether we are in the intentionality question
    // trial (testNumber is even) or the 'other questions' trial (testNumber is odd)
    const textreminder = <p style={{visibility: reminderViz}}>(We have
     a few more questions about {name}---here is a reminder about what happened.)</p> 
    
    // text displaying information about what happens in the story

    // material for the moral condition
    const textmoral = <div >
 <p>{name} has the opportunity to pull a lever that will randomly shoot a
 lethal arrow down exactly one of ten specified paths.</p>
 <p>A person named Bill is at the end of one of the ten paths. If {name} pulls
the lever and the lethal arrow shoots down the path with Bill on it,
then Bill will die.</p>
<p>{name} has no idea which path the arrow will shoot down if she pulls
the lever. But she does know that Bill is down path eight. And {name} really 
wants to kill Bill.</p>
<p>Hoping to kill Bill, {name} pulls the lever. To her great satisfaction, the
arrow shoots down path eight, and Bill is killed. </p>

    </div>;

    // material for the immoral condition

    const textneutral1 =  <div >
        <p>{name} is a contestant on a game show. In the game, {name} is given the opportunity to push a button. 
         If she pushes the button, a machine will select a ball at random from a container. 
        </p>
        <p>The container has a lot of <span style={{color:'purple'}}><b>purple</b></span> balls and only a few <span style={{color:'green'}}><b>green</b></span> balls. 
        If {name} gets a <span style={{color:'green'}}><b>green</b></span> ball, she wins a brand new <b>car</b>. If she gets a <span style={{color:'purple'}}><b>purple</b></span> ball, she wins nothing.</p>
    </div>;

    const pic_a = 
    <img style={{width:'20vw', height:'auto'}} src={kraemer_a}/>;

    const textneutral2 = <div>
        <p>{name} knows that she will get a brand new <b>car</b> if she gets a <span style={{color:'green'}}><b>green</b></span> ball. 
        She really wants to win the <b>car</b>, so she really wants to get a <span style={{color:'green'}}><b>green</b></span> ball.<br></br>
             {name} pushes the button. The machine selects a ball at random. To {name}'s great satisfaction, 
             it is a <span style={{color:'green'}}><b>green</b></span> ball, and she wins the <b>car</b>!<br></br></p>
    </div>;


    const pic_b = 
    <img style={{width:'40vw', height:'auto'}} src={kraemer_b}/>;

    const text = vignette === 'moral' ? textmoral : 
    vignette === 'neutral' ? <div>{textneutral1}{pic_a}{textneutral2}{pic_b}</div> : NaN;

    //the likert scale for each question

    const likertOptionsIntentionality =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseIntentionality(val.value);
            setDisplayButton(true);
        },
        id: 'questionIntentionality',
    };

    const likertOptionsCausation =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseCausation(val.value);
            setDisplayButton(true);
        },
        id: 'questionCausation',
    };


    const likertOptionsKnowHow =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseKnowHow(val.value);
            setDisplayButton(true);
        },
        id: 'questionKnowHow',
    };

    const likertOptionsProbRaising =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseProbRaising(val.value);
            setDisplayButton(true);
        },
        id: 'questionProbRaising',
    };

     //the intentionality question 

    const intentionalityText = vignette === 'moral' ? 
     <h4>{name} intentionally {dv==='means' ? 'made the arrow shoot down path eight.' :
         dv==='ends' ? 'killed Bill.' : NaN}</h4> :
         vignette === 'neutral' ? 
         <h4>{name} intentionally {dv==='means' ? 'got a green ball.' : 
            dv==='ends' ? 'won the car.' : NaN}</h4> : NaN;

    const intentionalityQuestion = <span>
    {/* <p>Please tell us how much you agree with the following statement:</p> */}
    {intentionalityText}
    <span><Likert {...likertOptionsIntentionality} /></span>
    </span>;

    const questionIntro = props.testNumber === 0 ?
    <p>Please tell us how much you agree with the following
         statements:</p> : props.testNumber === 1 ?
         <p>Please tell us how much you agree with the following
         statement:</p> :
         props.testNumber === 2 ?
         <p>Please answer the following questions to show you understand the story:</p> : Nan;

    const causationText = vignette === 'moral' ? <h4>{dv==='means' ? 'The arrow shot down path eight' :
         dv==='ends' ? 'Bill died' : NaN} because {name} wanted to {dv==='means' ? 'shoot the arrow down path eight.' : 
            dv==='ends' ? 'kill him.' : NaN}</h4> :
            vignette === 'neutral' ?
            <h4>{name} {dv==='means' ? 'got a green ball' : dv==='ends' ? 
                'won the car' : NaN} because she wanted to {dv==='means' ? 
                    'get a green ball.' : dv==='ends' ? 'win the car.' : NaN}</h4> : NaN;


    const causationQuestion =  <span>
        {causationText}
    <span><Likert {...likertOptionsCausation} /></span>
    </span>;

    const knowHowText = vignette === 'moral' ?
        <h4>{name} knows how to {dv==='means' ? 
            'make the arrow shoot down path eight.' : dv==='ends' ? 
            'kill Bill.' : NaN}</h4> :
            vignette === 'neutral' ?
            <h4>{name} knows how to {dv==='means' ? 'get a green ball.' :
                 dv==='ends' ? 'win the car.' : NaN}</h4> : NaN;


    const knowHowQuestion = <span>
        {knowHowText}
    <span><Likert {...likertOptionsKnowHow} /></span>
    </span>;

    const probRaisingText = vignette === 'moral' ?
                    <h4>Pulling the lever increased the probability of {dv==='means' ?
                         'the arrow shooting down path eight' : dv==='ends' ?
                          'Bill dying.' : NaN}</h4> :
                          vignette === 'neutral' ?
                          <h4>Pushing the button increased the probability of {name} {dv==='means' ?
                             'getting a green ball.' : dv==='ends' ? 'winning the car.' : NaN}</h4> : NaN;


    const probRaisingQuestion = <span>
        {probRaisingText}
    <span><Likert {...likertOptionsProbRaising} /></span>
    </span>;

    // creates an array with the causation, probability-raising and know-how questions
    // (order randomized between participants, constant within participant)
    const otherQuestions = [0,1,2].map((i)=>{
        let q = questionOrder[i];
        return(
            q==='causation' ? causationQuestion :
            q==='knowHow' ? knowHowQuestion : 
            q==='probRaising' ? probRaisingQuestion :
            NaN
        )
    })


    // comprehension questions
    const comprehensionQuestionsMoral = <form>
        <label for="sad">{name} is sad that Bill died. </label>

        <select name="sad" id="sad" onChange={(e) => handleSad(e)}>
            <option value="NA">  </option>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
        <br></br>
        <label for="pathnumber">Which path is Bill on? </label>

        <select name="pathnumber" id="pathnumber" onChange={(e) => handlePathnumber(e)}>
            <option value="NA">  </option>
            <option value="three">Three</option>
            <option value="eight">Eight</option>
            <option value="ten">Ten</option>

        </select>
        <br></br>
        <br></br>
    </form>;

    const comprehensionQuestionsNeutral = <form>
        <label for="sad">{name} is sad that she won the car. </label>

        <select name="sad" id="sad" onChange={(e) => handleSad(e)}>
            <option value="NA">  </option>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
        <br></br>
        <label for="pathnumber">A ball of which color is required to win the car? </label>

        <select name="ballcolor" id="ballcolor" onChange={(e) => handleBallcolor(e)}>
            <option value="NA">  </option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>

        </select>
        <br></br>
        <br></br>
    </form>;

    const comprehensionQuestions = vignette === 'moral' ? comprehensionQuestionsMoral :
    vignette === 'neutral' ? comprehensionQuestionsNeutral : NaN;


    // compute which question(s) to display
    const questions = props.testNumber === 0 ? otherQuestions :
    props.testNumber === 1 ?  intentionalityQuestion :
    props.testNumber === 2 ? comprehensionQuestions : NaN;

    // control when to display the Next-Page button
    const nextPageViz = props.testNumber === 0 ?  
    (responseCausation===0|responseKnowHow===0|responseProbRaising===0 ?
         'hidden' : 'visible') :
    props.testNumber === 1 ? (displayButton ? 'visible' : 'hidden') :
    props.testNumber === 2 ? (sad===0|(pathnumber===0 & ballcolor===0) ? 'hidden' : 'visible') : NaN

    // next-page button
    const nextPageButton = <button style={{...buttonStyle, visibility: nextPageViz}} onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {textreminder}
            {text}
            {/* {pic_a}
            {text2}
            {pic_b} */}
            {questionIntro}
            {questions}
            {nextPageButton}
        </div>

    )
}

export default TestPhase;