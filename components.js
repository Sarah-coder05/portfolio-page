

function generateRandId() {
    let _output = "";
    var captchaStr = "";
    let alphaNums = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
  
    function generateTdId() {
      //let emptyArr = [];
      let emptyStr = "";
      let emptyArr = Array.from({ length: 5 }, (e) => []);
  
      for (let i = 1; i <= 8; i++) {
        emptyArr[0].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
      }
      captchaStr = captchaStr.concat("", emptyArr[0].join(""));
      for (let i = 1; i <= 4; i++) {
        emptyArr[1].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
      }
      captchaStr = captchaStr.concat("-", emptyArr[1].join(""));
      for (let i = 1; i <= 4; i++) {
        emptyArr[2].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
      }
      captchaStr = captchaStr.concat("-", emptyArr[2].join(""));
      for (let i = 1; i <= 4; i++) {
        emptyArr[3].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
      }
      captchaStr = captchaStr.concat("-", emptyArr[3].join(""));
      for (let i = 1; i <= 12; i++) {
        emptyArr[4].push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        //emptyStr = emptyStr.concat(" ", alphaNums[Math.floor(Math.random() * alphaNums.length)])
      }
  
      captchaStr = captchaStr.concat("-", emptyArr[4].join(""));
  
      // ctx.clearRect(0, 0, captchaText.width, captchaText.height);
      // ctx.fillText(captchaStr, captchaText.width/4, captchaText.height/2);
  
      //return emptyArr;
      return {
        emptyArr,
        captchaStr,
        // emptyStr
      };
    }
  
    const resl = generateTdId();
    //_output = resl[0.join('')],
    //console.log({resl})
    _output = resl.captchaStr;
  
    return `id${_output}`;
  }










// ==========================================================================================

function htmlElementToJson(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return null;
    }

    const nodes = [];

    function parseNode(node) {
        const result = {
            _id: generateRandId(),
            tag: node.tagName.toLowerCase(),
            classes: Array.from(node.classList),
            data: {},
            children: [],
        };

        // Extract attributes
        Array.from(node.attributes).forEach((attr) => {
            if (attr.name !== 'class' && attr.name !== 'id') {
                if (attr.name == "data-type") {
                    result.type = attr.value;
                } else {
                    result.data[attr.name] = attr.value;
                }
            }
        });

        // Process child nodes
        Array.from(node.childNodes).forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                const childResult = parseNode(childNode);
                result.children.push(childResult._id);
                nodes.push(childResult);
            } else if (childNode.nodeType === Node.TEXT_NODE) {
                const textContent = childNode.textContent.trim();
                if (textContent !== '') {
                    const textNode = {
                        _id: generateRandId(),
                        text: true,
                        v: textContent,
                    };
                    result.children.push(textNode._id);
                    nodes.push(textNode);
                }
            }
        });

        return result;
    }

    const rootNode = parseNode(element);
    nodes.push(rootNode);

    // Move the root node to the beginning of the array
    nodes.unshift(nodes.pop());
    return nodes;
}

// Example usage
const elementId = `contactmain`; // Replace with the actual ID of your HTML element
const nodesArray = htmlElementToJson(elementId);

if (nodesArray) {
 console.log(nodesArray);
}




//  ========================C O N V E R T ======== C S S ==================



function transformCssToJson(cssString) {
  const jsonResult = [];
  const VarientArr = [];

  const parseCssRules = (cssRules) => {
    for (const cssRule of cssRules) {
      const { selectorText, style } = cssRule;
      const [className, ...variants] = selectorText.split('.');
      // console.log(cssRule,variants);
      if (cssRule.parentRule != null) {
        VarientArr.push(cssRule)
      }else{
        const id = generateRandomId(); // You need to implement your own ID generation logic

        const jsonItem = {
          style_id : id,
          data: {
            comb: "",
            affects: {},
            children: [],
            name: className,
            sel: selectorText,
            styleLess: style.cssText,
            type: "class",
            variants: {}
          }
        }
        jsonResult.push(jsonItem);
      };
     
    }
  };

  const generateRandomId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Parse the CSS string
  const styleElement = document.createElement('style');
  styleElement.textContent = cssString;
  document.head.appendChild(styleElement);

  const styleSheet = styleElement.sheet;

  // Handle media queries
  for (const cssRule of styleSheet.cssRules) {
    if (cssRule.type === CSSRule.MEDIA_RULE) {
      parseCssRules(cssRule.cssRules);
    } else if (cssRule.type === CSSRule.STYLE_RULE) {
      parseCssRules([cssRule]);
    }
  }

  //Add final varients to created array of styles
  function addVrients() {
    for (const rule in VarientArr) {
      const vSelectorText =  VarientArr[rule].selectorText
      const parent = jsonResult.find(e => e.data.sel == vSelectorText)

      const mediaQueryString = VarientArr[rule].parentRule.conditionText;

      // Use a regular expression to extract the pixel value
      const pixelValueMatch = mediaQueryString.match(/\d+/);

      // Check if a match is found
      let pixel;
      if (pixelValueMatch) {
        const pixelValue = parseInt(pixelValueMatch[0]);
        pixel = pixelValue;
      } else {
        console.log("No pixel value found");
      }

      let jsonItem;

      if(!parent){
        const id = generateRandomId()
        jsonItem = {
          style_id:id,
          data: {
            comb: "",
            affects: {},
            children: [],
            name: vSelectorText,
            sel: vSelectorText,
            styleLess: "",
            type: "class",
            variants: {}
          }
        }
      }


      switch (pixel) {
        case 470:
          if (!parent) {
            jsonItem.data.variants["tiny"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }else{
            parent.data.variants["tiny"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }
          break;
        case 767:
          if (!parent) {
            jsonItem.data.variants["small"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }else{
            parent.data.variants["small"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }
          break;
        case 991:
          if (!parent) {
            jsonItem.data.variants["medium"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }else{
            parent.data.variants["medium"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }
          break;
        case 1280:
          if (!parent) {
            jsonItem.data.variants["large"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }else{
            parent.data.variants["large"] = {sel:vSelectorText, styleLess:VarientArr[rule].style.cssText}
          }
          break;
        default:
          break;
      }

      if(jsonItem){
        jsonResult.push(jsonItem)
      }
    }

    
  }

  addVrients()
  return jsonResult;
}


// Example usage:
const cssString =`*, *::before, *::after {
    box-sizing: border-box;
}

html, body {
  font-family: inter;
  height: 100%;
  margin: 0;
  padding: 0;
  max-width: 1300px;
  margin: auto;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Poppins", sans-serif;
}

img {
  display: block;
}

ul {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  margin: 0;
}

#contactmain {
    padding: 2em .8em;
}

.note{
  line-height: 25px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

hr {
  margin: 2em 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.menu-icon {
  width: 40px;
  height: 40px;
}

.tailorflow {
  text-decoration: none;
  font-weight: 600;
  font-size: 25px;
  color: #003435;
}
.header-list{
  display: none;
}

.get-in-touch{
  font-size: 2.4em;
  padding-top: 20px;
}

.working-page > p {
  margin: 1em 0;
}

.arrow {
  display: flex;
  gap: 3px;
  width: 105px;
  font-size: 1.2em;
  align-items: center;
  justify-content: space-between;
}
.arrow-image {
  width: 30px;
  height: 30px;
}
.contacts-icon{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 26px;
}

.form_ctn {
  width: 95%;
}

form {
  background-color: #fff;
  padding: 0px;
  border-radius: 8px;
  color: #051424;
  display: flex;
  flex-direction: column;
  margin: 80px 0;
  width: 100%;
}

label {
  margin-bottom: 0px;
}

input, textarea {
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}

button {
  background-color: black;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 140px;
  margin-top: 1.3em;
}


.follow {
  display: flex;
  flex-direction: column;
  gap: 1.8em;
  margin-bottom: 2em;
}

.follow-me {
  font-size: 1.5em;
  letter-spacing: .05em;
}

.icon-list {
  display: flex;
  align-items: center;
  gap: .5em;
  margin-bottom: 1em;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 1.8em;
}

.footer-up, .footer-down {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-size: 1em;
}

.copy-right {
  margin-top: 1.5em;
  font-size: .9em;
  color: #344054;
}

@media (min-width: 470px) {
  .working-page > p {
    width: 97%;
  }
}

@media (min-width: 767px){
  .header-list{
    display: none;
  }
  .menu-icon{
    display: block;
  }
  .header-icons {
    text-decoration: none;
    color: #1d2939;
  }
  li {
    list-style: none;
  }
 
 .contact-page {
  margin: auto;
  width: 70%;
  text-align: center;
 }

 .arrow {
  width: 120px;
 }

 .form_ctn {
  width: 70%;
  margin: auto;
 }

  .follow {
    margin: 5em 0;
    gap: 1em;
  }

  .follow, .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .footer-down {
    width: 40%;
  }
}

@media (min-width: 991px){
   
  .header-icons {
    text-decoration: none;
    color: #1d2939;
  }
  li {
    list-style: none;
  }
  .header-list{
    display: flex;
    padding: 0px;
  }
  .menu-icon{
    display: none;
  }
  .contact-area{
    display: flex;
    gap: 15%;
    justify-content: space-around;
   
  }
  .contact-page {
    text-align: left;
  }
  
  .contacts-icon {
    width: 70%;
    justify-content: left;
    margin-top: 1.5em;
  }
  
}

@media (min-width: 1240px) {
   .follow{
        display: flex;
        justify-content: space-between;
        padding-top: 50px;
        gap: 50px;
    }
}`;
const result = transformCssToJson(cssString);
console.log(result);



// =============components ========================================



console.log(generateRandId());
// ================ngo ==================================








const temp = {
    "title": "Portfolio-1",
    "description": "This is the portfolio-1 template",
    "category": "Portfolio category",
    "amount": "0",
    "thumbnail": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709971829539-Banner%202.png",
    "assets":{},
    "pages": [
        {
            "route":"/index.html",
            "name":"Home page",
            "head":{
                "title":"Home page",
                "description":"This is the home page for portfolio-1",
            },
            "slug":"gVGW-vQL7-Ye87JFZkDgFA",           
            "page_id":"id9152WmWK-CXbr-f6uo-uTRr-D3oGvffQkGlk",
            "nodes":[
              {
                  "_id": "idy2LqtLKc-wqAm-65yW-iC0K-OFjKwo6vAXVZ",
                  "tag": "main",
                  "classes": [],
                  "data": {},
                  "children": [
                      "iddlHViN1Z-x1fk-8Y8d-EksC-RgeBbtvYojQt",
                      "idoW5jsyDv-N6Dn-j5Dg-M671-4l4Hkl2bMyXy",
                      "idxkifc2CI-uEMb-F2zF-c0ZJ-4zP76LTOnijT",
                      "idHvhdv9W3-Wjcq-Nzrt-G9b1-EM6t534Fjrww",
                      "id8TKx1C4a-w2Pl-KCoC-CAX5-wx1sWUzTFqrq",
                      "iddjgCa1Cq-vaCk-Lbxs-FTOc-GVIP33k5jal8",
                      "idoIEjHwjA-hoOs-lG1X-qDIe-k4KEkySXNLuu",
                      "idAFpxLdLY-S3hE-abfW-PNmC-gFv6lsdAwvUo",
                      "idZaggrveI-2No4-rUwq-GAcP-TBdmJmGKV3cf",
                      "iddwLg0YFh-1XiQ-3J62-Y4pY-Rj7tMWVSIc3y",
                      "idd1fFZ6rJ-6nfU-Ge6L-ty5y-w8ze7JSpsQae",
                      "id7bGSf3JN-b3Hc-VSLo-STbk-vy55UCL2WSac",
                      "id2EEeT5dR-5QBY-hfqv-b3qs-QKKttH2s5aQ1",
                      "idGI5VEDBM-V9ze-mU2N-Eeyx-Y1L1KM8hQcm6",
                      "idMQDL9C2D-6Mt4-4XWp-d11l-OSbLnsPOuPCH",
                      "idwZqBYK4B-bOCr-ARu2-6eLi-k1zNGymBNMSW",
                      "idgUUM7hId-D50O-woOZ-fSya-CGlna2X10PQk"
                  ],
                  "type": "main"
              },
              {
                  "_id": "idGbJvrzVv-RZ7N-D6t7-4ld4-Ic3MQw8W7gu2",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idDef2Uvdw-yJlI-OlcB-2w8Y-H0gmWm4ywzQy",
                  "tag": "a",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {
                      "href": "./index.html"
                  },
                  "children": [
                      "idGbJvrzVv-RZ7N-D6t7-4ld4-Ic3MQw8W7gu2"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idsTsHHrFV-fYk5-nIbe-sqWK-2q66UX2kGPsz",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idDef2Uvdw-yJlI-OlcB-2w8Y-H0gmWm4ywzQy"
                  ],
                  "type": "list item"
              },
              {
                  "_id": "idle7Ee61S-dfmr-9BT5-9l9s-wJi83Lp0VAL1",
                  "tag": "ul",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idsTsHHrFV-fYk5-nIbe-sqWK-2q66UX2kGPsz"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "idUt4q9mcs-bhzM-VKUb-fanx-zizxGTNet33w",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "iddfzzU93s-q0CH-ElWY-ZWu1-vngxTIzZqjfo",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./about.html"
                  },
                  "children": [
                      "idUt4q9mcs-bhzM-VKUb-fanx-zizxGTNet33w"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idXpgtunRb-2xwa-dksJ-MZqD-iySAa4fQjDtD",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "iddfzzU93s-q0CH-ElWY-ZWu1-vngxTIzZqjfo"
                  ],
                  "type": "list item"
              },
              {
                  "_id": "idfpRwj7w5-qeMd-SAj5-VmOv-ra6Lf1EYAiuB",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idRgUbIK4V-4LgN-3C91-1ZN7-RA13q3xm4hai",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./portfolioDetails.html"
                  },
                  "children": [
                      "idfpRwj7w5-qeMd-SAj5-VmOv-ra6Lf1EYAiuB"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idljDe19qi-x8Mw-iS33-sZmW-4MzEznH25uI6",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idRgUbIK4V-4LgN-3C91-1ZN7-RA13q3xm4hai"
                  ],
                  "type": "list item"
              },
              {
                  "_id": "idKzsXiq3L-3e7c-MdNO-MphR-trCJUBKBG21z",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "id5984BBOq-OoaF-GP0L-4Wdq-WTESAd7VHXIs",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./contact.html"
                  },
                  "children": [
                      "idKzsXiq3L-3e7c-MdNO-MphR-trCJUBKBG21z"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "id8ULftqXL-5xWQ-v0Lb-kGoj-SYrn6oCuJojw",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id5984BBOq-OoaF-GP0L-4Wdq-WTESAd7VHXIs"
                  ],
                  "type": "list item"
              },
              {
                  "_id": "id9dI7OWrj-gOsX-296h-M9H8-hXxf2PboluMD",
                  "tag": "ul",
                  "classes": [
                      "header",
                      "header-list"
                  ],
                  "data": {},
                  "children": [
                      "idXpgtunRb-2xwa-dksJ-MZqD-iySAa4fQjDtD",
                      "idljDe19qi-x8Mw-iS33-sZmW-4MzEznH25uI6",
                      "id8ULftqXL-5xWQ-v0Lb-kGoj-SYrn6oCuJojw"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "idUx0NDJ0C-ITtb-470d-jBPw-X5f3VUi7DTXs",
                  "tag": "img",
                  "classes": [
                      "menu-icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idcxzkTx2o-SUkB-TyyA-ELpR-LMnkH1rZA401",
                  "tag": "nav",
                  "classes": [
                      "header"
                  ],
                  "data": {},
                  "children": [
                      "idle7Ee61S-dfmr-9BT5-9l9s-wJi83Lp0VAL1",
                      "id9dI7OWrj-gOsX-296h-M9H8-hXxf2PboluMD",
                      "idUx0NDJ0C-ITtb-470d-jBPw-X5f3VUi7DTXs"
                  ],
                  "type": "Navigation"
              },
              {
                  "_id": "iddlHViN1Z-x1fk-8Y8d-EksC-RgeBbtvYojQt",
                  "tag": "header",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idcxzkTx2o-SUkB-TyyA-ELpR-LMnkH1rZA401"
                  ],
                  "type": "Header"
              },
              {
                  "_id": "idoW5jsyDv-N6Dn-j5Dg-M671-4l4Hkl2bMyXy",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idggxAA7pc-IPp8-k5he-of8W-fVMknTOMIUpq",
                  "text": true,
                  "v": "I'm Akin, and I design"
              },
              {
                  "_id": "idbGLXJNPW-eG6d-g4Xe-veAd-cJCieAop9jG9",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idvr6Zn2HZ-3AYn-tViS-RNtO-IQxFqE3trBsg",
                  "text": true,
                  "v": "user interfaces for startups"
              },
              {
                  "_id": "idXJNuNlj7-Sgxv-JS8V-JvXa-xpGb0w18Ccle",
                  "tag": "h1",
                  "classes": [
                      "interface"
                  ],
                  "data": {},
                  "children": [
                      "idggxAA7pc-IPp8-k5he-of8W-fVMknTOMIUpq",
                      "idbGLXJNPW-eG6d-g4Xe-veAd-cJCieAop9jG9",
                      "idvr6Zn2HZ-3AYn-tViS-RNtO-IQxFqE3trBsg"
                  ],
                  "type": "Heading 1"
              },
              {
                  "_id": "idzjkGKVsT-XFAB-Geey-RN0u-11TZcjC4xNHn",
                  "text": true,
                  "v": "I'm passionate about bringing user perspectives and insight into\n          the product"
              },
              {
                  "_id": "idNot6h7Ra-Fk6D-u554-dFYv-CywdhgyhOFb4",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "id5LEB6Lai-5K7a-jVcG-pAXs-xgbzZyzdSeqt",
                  "text": true,
                  "v": "development life cycle, helping me solve problems that users want to\n          be solved."
              },
              {
                  "_id": "idOJQJsRdX-Rkqn-8VFA-184y-CBbcndqBTdY4",
                  "tag": "p",
                  "classes": [
                      "note"
                  ],
                  "data": {},
                  "children": [
                      "idzjkGKVsT-XFAB-Geey-RN0u-11TZcjC4xNHn",
                      "idNot6h7Ra-Fk6D-u554-dFYv-CywdhgyhOFb4",
                      "id5LEB6Lai-5K7a-jVcG-pAXs-xgbzZyzdSeqt"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idxkifc2CI-uEMb-F2zF-c0ZJ-4zP76LTOnijT",
                  "tag": "div",
                  "classes": [
                      "interface-design"
                  ],
                  "data": {},
                  "children": [
                      "idXJNuNlj7-Sgxv-JS8V-JvXa-xpGb0w18Ccle",
                      "idOJQJsRdX-Rkqn-8VFA-184y-CBbcndqBTdY4"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idHvhdv9W3-Wjcq-Nzrt-G9b1-EM6t534Fjrww",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idVhCjIVxU-hhvh-1uwP-Imen-1sRVypBtdEvG",
                  "text": true,
                  "v": "Past projects"
              },
              {
                  "_id": "idJMRPUUyp-IbEC-5M83-DcqC-73Mhf3KleATi",
                  "tag": "h2",
                  "classes": [
                      "past-projects"
                  ],
                  "data": {},
                  "children": [
                      "idVhCjIVxU-hhvh-1uwP-Imen-1sRVypBtdEvG"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "id2g1uCBfe-LQv0-J9W4-Uoii-HZ6RbkdDwZX0",
                  "text": true,
                  "v": "Skincare X"
              },
              {
                  "_id": "idxqhSYg6f-NtZw-8Rhg-4MmD-MyLZEsAji2d4",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id2g1uCBfe-LQv0-J9W4-Uoii-HZ6RbkdDwZX0"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idrx1NV0Ox-3ESM-jPzb-87F6-hvW5OwLhMkr1",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idg3QkjtZg-tygi-DmRM-ZZuc-nst1WZnnnu4E",
                  "text": true,
                  "v": "Web design"
              },
              {
                  "_id": "idBFILpMAn-g7HL-JDai-MU79-6mEgD3kZOaeT",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idg3QkjtZg-tygi-DmRM-ZZuc-nst1WZnnnu4E"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "iduUkulEJI-VF7w-oBaP-PvVC-5PP7l4rWmhXd",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idxqhSYg6f-NtZw-8Rhg-4MmD-MyLZEsAji2d4",
                      "idrx1NV0Ox-3ESM-jPzb-87F6-hvW5OwLhMkr1",
                      "idBFILpMAn-g7HL-JDai-MU79-6mEgD3kZOaeT"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idEL1gZpTo-mMTM-RpmU-9jo9-82psOKSUcqB0",
                  "text": true,
                  "v": "Website redesign for Skincare Brand"
              },
              {
                  "_id": "idMTUteTge-MW7T-VYhp-0lGo-jIVysJcfDwwi",
                  "tag": "h3",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "idEL1gZpTo-mMTM-RpmU-9jo9-82psOKSUcqB0"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idVH4Kozsn-gUvq-FdUE-l1rU-OJIS3w6tYVJH",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n                egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n                montes senectus."
              },
              {
                  "_id": "idlbJkvv2u-BE6C-tHqc-B9QC-eBv6LgQkuEd1",
                  "tag": "p",
                  "classes": [
                      "note"
                  ],
                  "data": {},
                  "children": [
                      "idVH4Kozsn-gUvq-FdUE-l1rU-OJIS3w6tYVJH"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idJh5KekMt-cWee-hNB9-uVwO-QGQflM1CAT4E",
                  "text": true,
                  "v": "View project"
              },
              {
                  "_id": "idueiiNlSy-z1IP-x84R-vXaY-7BI8vxcec570",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "idJh5KekMt-cWee-hNB9-uVwO-QGQflM1CAT4E"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idzwlfl4aD-fcRG-xc8L-gysk-qpIDZo4dCV3l",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idTWNT5KFF-3gaE-6RUL-vb6K-PJHlEpCwWkIN",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idueiiNlSy-z1IP-x84R-vXaY-7BI8vxcec570",
                      "idzwlfl4aD-fcRG-xc8L-gysk-qpIDZo4dCV3l"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idBDnTWsOs-L4n3-mI7i-ASYB-CRi37TJ1Wt3S",
                  "tag": "div",
                  "classes": [
                      "view"
                  ],
                  "data": {},
                  "children": [
                      "idTWNT5KFF-3gaE-6RUL-vb6K-PJHlEpCwWkIN"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNWc547zR-Busx-0BBD-0ThM-phQhDyOwhyl7",
                  "tag": "div",
                  "classes": [
                      "routine_txt"
                  ],
                  "data": {},
                  "children": [
                      "iduUkulEJI-VF7w-oBaP-PvVC-5PP7l4rWmhXd",
                      "idMTUteTge-MW7T-VYhp-0lGo-jIVysJcfDwwi",
                      "idlbJkvv2u-BE6C-tHqc-B9QC-eBv6LgQkuEd1",
                      "idBDnTWsOs-L4n3-mI7i-ASYB-CRi37TJ1Wt3S"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1GH7tDH4-znLD-z4p4-MGDv-ScCd9DGGoxQ6",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709221710473-Frame%201216400724.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idHNAIT1ik-KMO0-BeeP-t9QF-zZpwZStFfBwO",
                  "tag": "div",
                  "classes": [
                      "routine_ctn"
                  ],
                  "data": {},
                  "children": [
                      "id1GH7tDH4-znLD-z4p4-MGDv-ScCd9DGGoxQ6"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNw7CDYiq-CpO7-sBC2-j7mx-bcNeFjSI79OM",
                  "tag": "div",
                  "classes": [
                      "website-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idNWc547zR-Busx-0BBD-0ThM-phQhDyOwhyl7",
                      "idHNAIT1ik-KMO0-BeeP-t9QF-zZpwZStFfBwO"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id52zaoqyN-DqVl-g7Io-ONGA-MoxkgPcutTZl",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id8zPRpa6U-acIn-3Imj-hOfi-ceQ8SfIOhs8t",
                  "text": true,
                  "v": "Wellness Y"
              },
              {
                  "_id": "idVhyLL0qZ-zzXV-R77P-iCbw-RcviVhmramAf",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id8zPRpa6U-acIn-3Imj-hOfi-ceQ8SfIOhs8t"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idWsMB7U46-DxWT-ROWr-uuqL-boHV0HR2rYGe",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idd3o6k8iD-A4RM-kuUr-OcKo-YOwmzHsb77kb",
                  "text": true,
                  "v": "Web design"
              },
              {
                  "_id": "idr006zsbV-CXso-Mbkt-mMku-xVFZx97n1XWR",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idd3o6k8iD-A4RM-kuUr-OcKo-YOwmzHsb77kb"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idP3Gw2MOY-ULVQ-ydmv-YGIa-tAsykfREsPTf",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idVhyLL0qZ-zzXV-R77P-iCbw-RcviVhmramAf",
                      "idWsMB7U46-DxWT-ROWr-uuqL-boHV0HR2rYGe",
                      "idr006zsbV-CXso-Mbkt-mMku-xVFZx97n1XWR"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id53RAjfc2-V8RB-pXSG-VcQL-Z5XOVG3n4zpJ",
                  "text": true,
                  "v": "Website redesign for Wellness app"
              },
              {
                  "_id": "idA6z7m9bD-7qq9-327Y-fYE1-mXoFoL3zqt83",
                  "tag": "h3",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "id53RAjfc2-V8RB-pXSG-VcQL-Z5XOVG3n4zpJ"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idhPlVRc7I-HCkK-dRlF-cpJz-SlEdcm85axyV",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n                egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n                montes senectus."
              },
              {
                  "_id": "idYUWjKPiM-NM33-BzYG-wGra-cP1by2wIxfaT",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idhPlVRc7I-HCkK-dRlF-cpJz-SlEdcm85axyV"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "iduItSqHi7-jFqS-rYur-ohG4-o9w4HpxJRkxC",
                  "text": true,
                  "v": "View project"
              },
              {
                  "_id": "idaQrKmwRI-8Bj6-p1bf-adEh-TlbiybZV6LSq",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "iduItSqHi7-jFqS-rYur-ohG4-o9w4HpxJRkxC"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id5iRV9k9y-21AR-FOem-luct-ZvZOXi24lFDy",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idGfClgYmi-ORUh-vIcH-8nfg-4mwxjuyhp6G7",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idaQrKmwRI-8Bj6-p1bf-adEh-TlbiybZV6LSq",
                      "id5iRV9k9y-21AR-FOem-luct-ZvZOXi24lFDy"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idTIXzPhF8-NtsQ-t2JH-sMWB-mZnM9h4ABzIq",
                  "tag": "div",
                  "classes": [
                      "shortLine"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idKYrIvwb5-DAQc-FYUU-3Ywq-eeS4gJ1UvAi8",
                  "tag": "div",
                  "classes": [
                      "view"
                  ],
                  "data": {},
                  "children": [
                      "idGfClgYmi-ORUh-vIcH-8nfg-4mwxjuyhp6G7",
                      "idTIXzPhF8-NtsQ-t2JH-sMWB-mZnM9h4ABzIq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idf2CMfIUc-X21x-Wid0-GYYN-5d1v2tEmnI9L",
                  "tag": "div",
                  "classes": [
                      "routine_txt"
                  ],
                  "data": {},
                  "children": [
                      "idP3Gw2MOY-ULVQ-ydmv-YGIa-tAsykfREsPTf",
                      "idA6z7m9bD-7qq9-327Y-fYE1-mXoFoL3zqt83",
                      "idYUWjKPiM-NM33-BzYG-wGra-cP1by2wIxfaT",
                      "idKYrIvwb5-DAQc-FYUU-3Ywq-eeS4gJ1UvAi8"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id58tBHwK0-eaSj-Ii6C-GGap-Ot7Py84yplHE",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709225665031-Frame%201216400724%20%281%29.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idq2o9O5LU-XL4m-UCa4-o0aS-ZSbafkPlz8Bn",
                  "tag": "div",
                  "classes": [
                      "routiine_ctn",
                      "hard"
                  ],
                  "data": {},
                  "children": [
                      "id58tBHwK0-eaSj-Ii6C-GGap-Ot7Py84yplHE"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idDqmLWX6W-4U9E-Wb1s-GqhH-axDRUDCLERdq",
                  "tag": "div",
                  "classes": [
                      "website-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idf2CMfIUc-X21x-Wid0-GYYN-5d1v2tEmnI9L",
                      "idq2o9O5LU-XL4m-UCa4-o0aS-ZSbafkPlz8Bn"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idzKlyMVZv-FATs-iwgM-XwnD-m8AVe4EIcEf8",
                  "text": true,
                  "v": "Wellness Y"
              },
              {
                  "_id": "id6llmHv0o-2Ryf-JcPp-wSCe-0cOnB6LHUXR7",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idzKlyMVZv-FATs-iwgM-XwnD-m8AVe4EIcEf8"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id2k5ZAad7-NQr3-EXTp-qFJM-FpHnelui7kGr",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idwf938EeX-rGgq-IJv7-DATl-XSG9VbZ8bKOS",
                  "text": true,
                  "v": "Web design"
              },
              {
                  "_id": "idpGxg1cdX-rARx-d7On-ohbv-WsKRxv0nPEft",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idwf938EeX-rGgq-IJv7-DATl-XSG9VbZ8bKOS"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idkVlTte3z-Th7q-CkS3-7y3m-R6puFnsTkhA7",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "id6llmHv0o-2Ryf-JcPp-wSCe-0cOnB6LHUXR7",
                      "id2k5ZAad7-NQr3-EXTp-qFJM-FpHnelui7kGr",
                      "idpGxg1cdX-rARx-d7On-ohbv-WsKRxv0nPEft"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNtog7PtY-NvQi-INHm-ayy7-1ReQTwWqhlZj",
                  "text": true,
                  "v": "Website redesign for Healthcare"
              },
              {
                  "_id": "idj3SFn63C-iuBM-uk1O-teXE-EyJfmzYNp0pp",
                  "tag": "h3",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "idNtog7PtY-NvQi-INHm-ayy7-1ReQTwWqhlZj"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idCh1sTIt6-rdqp-EO9c-4PdR-tBbFimgGW4vd",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n                egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n                montes senectus."
              },
              {
                  "_id": "idMbdkjdb6-ocj0-jZcH-AdmB-RgSy3u18RrA1",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idCh1sTIt6-rdqp-EO9c-4PdR-tBbFimgGW4vd"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idyKV7UP9F-oWND-Kkwv-TWow-obQdDx5EiDCn",
                  "text": true,
                  "v": "View project"
              },
              {
                  "_id": "idn9UmepFb-RAa5-wslo-YdcY-YRuvaPFD29Wy",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "idyKV7UP9F-oWND-Kkwv-TWow-obQdDx5EiDCn"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idF9uY51Oy-75y9-Mwup-gMcp-9JErAKuv9znm",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idSwCow0dN-DbDW-JCzd-Wfxf-qK2zDJSKHp6k",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idn9UmepFb-RAa5-wslo-YdcY-YRuvaPFD29Wy",
                      "idF9uY51Oy-75y9-Mwup-gMcp-9JErAKuv9znm"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idP90San8c-Bury-BsM4-r5yX-VcHypmkCZ0pc",
                  "tag": "div",
                  "classes": [
                      "shortLine"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idfQ3fcaeI-GRZr-OytW-sv9j-k7FfuCK78D2z",
                  "tag": "div",
                  "classes": [
                      "view"
                  ],
                  "data": {},
                  "children": [
                      "idSwCow0dN-DbDW-JCzd-Wfxf-qK2zDJSKHp6k",
                      "idP90San8c-Bury-BsM4-r5yX-VcHypmkCZ0pc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idKHqnoJXY-n1sH-TWg2-0KnA-B1qDoPwEdW1U",
                  "tag": "div",
                  "classes": [
                      "routine_txt"
                  ],
                  "data": {},
                  "children": [
                      "idkVlTte3z-Th7q-CkS3-7y3m-R6puFnsTkhA7",
                      "idj3SFn63C-iuBM-uk1O-teXE-EyJfmzYNp0pp",
                      "idMbdkjdb6-ocj0-jZcH-AdmB-RgSy3u18RrA1",
                      "idfQ3fcaeI-GRZr-OytW-sv9j-k7FfuCK78D2z"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idVyqnppA0-xrhd-iuCn-kyY0-xl5wd2Bdes4B",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709226002352-Frame%201216400724%20%282%29.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id3QtxRPCU-ug5o-uzBq-GUxC-oW9k8beFdPPX",
                  "tag": "div",
                  "classes": [
                      "routine_ctn"
                  ],
                  "data": {},
                  "children": [
                      "idVyqnppA0-xrhd-iuCn-kyY0-xl5wd2Bdes4B"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idKsPtGNUw-cBsU-5GZE-Vm70-fLYrP3HGSb7J",
                  "tag": "div",
                  "classes": [
                      "website-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idKHqnoJXY-n1sH-TWg2-0KnA-B1qDoPwEdW1U",
                      "id3QtxRPCU-ug5o-uzBq-GUxC-oW9k8beFdPPX"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id5rgtNWs2-ou7k-d4vq-zKvi-UYCjt7KOBKLO",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNw7CDYiq-CpO7-sBC2-j7mx-bcNeFjSI79OM",
                      "id52zaoqyN-DqVl-g7Io-ONGA-MoxkgPcutTZl",
                      "idDqmLWX6W-4U9E-Wb1s-GqhH-axDRUDCLERdq",
                      "idKsPtGNUw-cBsU-5GZE-Vm70-fLYrP3HGSb7J"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id8TKx1C4a-w2Pl-KCoC-CAX5-wx1sWUzTFqrq",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idJMRPUUyp-IbEC-5M83-DcqC-73Mhf3KleATi",
                      "id5rgtNWs2-ou7k-d4vq-zKvi-UYCjt7KOBKLO"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iddjgCa1Cq-vaCk-Lbxs-FTOc-GVIP33k5jal8",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idDzkZ0YMb-HMcS-TZM1-AXz5-ZXMw5m9yBUx7",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idoIEjHwjA-hoOs-lG1X-qDIe-k4KEkySXNLuu",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idDzkZ0YMb-HMcS-TZM1-AXz5-ZXMw5m9yBUx7"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idPMUURc7s-P3t7-Lkp4-AZ4U-Vsc22c1PEsfO",
                  "text": true,
                  "v": "Article & News"
              },
              {
                  "_id": "idYqgBkQlF-yAmD-rFT9-1MLt-X4rYsJDQumRL",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPMUURc7s-P3t7-Lkp4-AZ4U-Vsc22c1PEsfO"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idTm7FNfO0-saR2-wBml-YVqj-RDegxns4lwZF",
                  "text": true,
                  "v": "Browse more articles"
              },
              {
                  "_id": "idXy7mnolh-Yu0x-iYvo-p5Et-gzf6WjK5WIuG",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "idTm7FNfO0-saR2-wBml-YVqj-RDegxns4lwZF"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idUsjDeNHb-ZqqN-tcgp-NbTv-CBadmx98bT1x",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id8mETpHVe-QQKL-dRPD-OJ8r-yzCE0vkk3Wx1",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idXy7mnolh-Yu0x-iYvo-p5Et-gzf6WjK5WIuG",
                      "idUsjDeNHb-ZqqN-tcgp-NbTv-CBadmx98bT1x"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idAFpxLdLY-S3hE-abfW-PNmC-gFv6lsdAwvUo",
                  "tag": "div",
                  "classes": [
                      "article-news"
                  ],
                  "data": {},
                  "children": [
                      "idYqgBkQlF-yAmD-rFT9-1MLt-X4rYsJDQumRL",
                      "id8mETpHVe-QQKL-dRPD-OJ8r-yzCE0vkk3Wx1"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idEvqbjxgi-wESN-Lhyu-okFh-RGkLo8k6Yjl2",
                  "text": true,
                  "v": "Design"
              },
              {
                  "_id": "idBWEiihww-QvNl-8quz-VaAX-B1SUm9nTWVp6",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idEvqbjxgi-wESN-Lhyu-okFh-RGkLo8k6Yjl2"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idrRIC4xI8-o1X6-m3Gx-HROa-objxc2Lq5KVs",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idUOHQHHFI-DvaZ-FDTG-c7Tv-7u8xvu8WHaLT",
                  "text": true,
                  "v": "January 15,2024"
              },
              {
                  "_id": "id2e9EvxyY-sT15-tFH1-rlMt-WnMZNolEZev4",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idUOHQHHFI-DvaZ-FDTG-c7Tv-7u8xvu8WHaLT"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "iddhvKMSmR-q8s7-MTK4-qmAT-kRoot3kb6qWl",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idBWEiihww-QvNl-8quz-VaAX-B1SUm9nTWVp6",
                      "idrRIC4xI8-o1X6-m3Gx-HROa-objxc2Lq5KVs",
                      "id2e9EvxyY-sT15-tFH1-rlMt-WnMZNolEZev4"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idHwiFAFwT-cUeu-7bz6-TkMr-BWxljc4Jg80G",
                  "text": true,
                  "v": "What did I learn from doing 50+ design sprints?"
              },
              {
                  "_id": "id2U1wrAES-Mbbt-QTBh-5GxD-t0fFGWEjdv37",
                  "tag": "h3",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "idHwiFAFwT-cUeu-7bz6-TkMr-BWxljc4Jg80G"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "ida8VmBjAg-BrNp-P428-ynpc-oGyRnM6a03BJ",
                  "text": true,
                  "v": "View project"
              },
              {
                  "_id": "idqNswC2HT-sYyP-ua03-r33q-DYF9e8sJsvl2",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "ida8VmBjAg-BrNp-P428-ynpc-oGyRnM6a03BJ"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idLoI6yigG-gWUL-FVHe-7ePH-6L0YdZJPI9hp",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idByZlTmJa-rFip-hZnr-sb3Q-fKjX5322hMMV",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idqNswC2HT-sYyP-ua03-r33q-DYF9e8sJsvl2",
                      "idLoI6yigG-gWUL-FVHe-7ePH-6L0YdZJPI9hp"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idesPjdd4v-041p-Wk2z-FRO3-YsoQaF9kQYAU",
                  "tag": "div",
                  "classes": [
                      "shortLine"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idwc92t34Z-5chw-9kDY-5q0z-UPnvcHWXgtpZ",
                  "tag": "div",
                  "classes": [
                      "view"
                  ],
                  "data": {},
                  "children": [
                      "idByZlTmJa-rFip-hZnr-sb3Q-fKjX5322hMMV",
                      "idesPjdd4v-041p-Wk2z-FRO3-YsoQaF9kQYAU"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idwbVj4TOr-oGBK-DU98-00iz-6RPSPFQBvyP5",
                  "tag": "div",
                  "classes": [
                      "redesign"
                  ],
                  "data": {},
                  "children": [
                      "iddhvKMSmR-q8s7-MTK4-qmAT-kRoot3kb6qWl",
                      "id2U1wrAES-Mbbt-QTBh-5GxD-t0fFGWEjdv37",
                      "idwc92t34Z-5chw-9kDY-5q0z-UPnvcHWXgtpZ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idvmDor9bY-x2dU-k6T3-Lz3m-5htM9xc0H5do",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709251119099-Frame%201216400724%20%286%29.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id5CrhDXZJ-aKfF-yB17-g8Q0-Qaz7pDED07nf",
                  "tag": "div",
                  "classes": [
                      "routine_ctn"
                  ],
                  "data": {},
                  "children": [
                      "idvmDor9bY-x2dU-k6T3-Lz3m-5htM9xc0H5do"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idZaggrveI-2No4-rUwq-GAcP-TBdmJmGKV3cf",
                  "tag": "div",
                  "classes": [
                      "skincare-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idwbVj4TOr-oGBK-DU98-00iz-6RPSPFQBvyP5",
                      "id5CrhDXZJ-aKfF-yB17-g8Q0-Qaz7pDED07nf"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idFeJuZVM5-WguT-sGwZ-lleS-fDc8I6UC5J9T",
                  "text": true,
                  "v": "Typography"
              },
              {
                  "_id": "id56ULXpnO-rJSd-HrnZ-ktFB-DhlKuuoveaL1",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFeJuZVM5-WguT-sGwZ-lleS-fDc8I6UC5J9T"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idbkd7X0Ni-A57L-WkuS-LDPN-2MpQy4l3hIDT",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idqBjwCdcQ-mtWH-v2Vl-bytk-AejheoBBqD2c",
                  "text": true,
                  "v": "January ,2024"
              },
              {
                  "_id": "idrxsxrJi3-Gn8L-Xmq6-fPof-SOyOsWy4qEMB",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idqBjwCdcQ-mtWH-v2Vl-bytk-AejheoBBqD2c"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idWieKU9h0-a1Sj-OeBX-RvZH-T5Rk4cal4XMp",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "id56ULXpnO-rJSd-HrnZ-ktFB-DhlKuuoveaL1",
                      "idbkd7X0Ni-A57L-WkuS-LDPN-2MpQy4l3hIDT",
                      "idrxsxrJi3-Gn8L-Xmq6-fPof-SOyOsWy4qEMB"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idGBNUjrpf-fV2p-wV42-AWsO-2NqFi6wCAwXn",
                  "text": true,
                  "v": "5 free hot typographies to download in 2022"
              },
              {
                  "_id": "id4NMgQY3S-PaBW-tLIi-OLmT-yEdfCP0SsK3m",
                  "tag": "h3",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "idGBNUjrpf-fV2p-wV42-AWsO-2NqFi6wCAwXn"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idDRC3VBkG-GQ9d-1otu-HJzv-J45O7E6YQBzr",
                  "text": true,
                  "v": "View project"
              },
              {
                  "_id": "idTVWxTF2P-bHmc-K7qj-fNRH-fQSK2dpjrvQF",
                  "tag": "h5",
                  "classes": [
                      "view-project"
                  ],
                  "data": {},
                  "children": [
                      "idDRC3VBkG-GQ9d-1otu-HJzv-J45O7E6YQBzr"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id4UjgYV3p-9rfr-dgRv-SOdY-ZG1PVZZTiwLi",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id8UmrIVCq-gYtn-DB2I-bWEo-7itz3j3gYfVt",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idTVWxTF2P-bHmc-K7qj-fNRH-fQSK2dpjrvQF",
                      "id4UjgYV3p-9rfr-dgRv-SOdY-ZG1PVZZTiwLi"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idpvms0Ow0-E1eY-bGjo-szAh-3kf02R2OXGQ3",
                  "tag": "div",
                  "classes": [
                      "shortLine"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idEKxAuWqW-I5Oe-F0qT-JScZ-9broGDJxtlA9",
                  "tag": "div",
                  "classes": [
                      "view"
                  ],
                  "data": {},
                  "children": [
                      "id8UmrIVCq-gYtn-DB2I-bWEo-7itz3j3gYfVt",
                      "idpvms0Ow0-E1eY-bGjo-szAh-3kf02R2OXGQ3"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idpGdw5GFy-MVif-04g3-9ulW-8BZBpIHYozVu",
                  "tag": "div",
                  "classes": [
                      "redesign"
                  ],
                  "data": {},
                  "children": [
                      "idWieKU9h0-a1Sj-OeBX-RvZH-T5Rk4cal4XMp",
                      "id4NMgQY3S-PaBW-tLIi-OLmT-yEdfCP0SsK3m",
                      "idEKxAuWqW-I5Oe-F0qT-JScZ-9broGDJxtlA9"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1pqzQG4T-mG1b-xE11-TcWi-Z6yTdDN05F4j",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709249496405-Frame%201216400724%20%284%29.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idowFTkyRF-HCDi-kxwL-aQXF-GyzAqUJ5CsS3",
                  "tag": "div",
                  "classes": [
                      "routine_ctn"
                  ],
                  "data": {},
                  "children": [
                      "id1pqzQG4T-mG1b-xE11-TcWi-Z6yTdDN05F4j"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iddwLg0YFh-1XiQ-3J62-Y4pY-Rj7tMWVSIc3y",
                  "tag": "div",
                  "classes": [
                      "skincare-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idpGdw5GFy-MVif-04g3-9ulW-8BZBpIHYozVu",
                      "idowFTkyRF-HCDi-kxwL-aQXF-GyzAqUJ5CsS3"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idd1fFZ6rJ-6nfU-Ge6L-ty5y-w8ze7JSpsQae",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idLD44RuGh-sc23-7rtZ-ROR0-ZeppCOII9OD8",
                  "text": true,
                  "v": "About who's behind all this"
              },
              {
                  "_id": "idgTe5Xt3E-C3nk-NfRP-DStn-le7pMNogeVDi",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idOxcYYsxb-nkEP-0zEm-khZZ-n5nXRJAiqz8A",
                  "text": true,
                  "v": "great work"
              },
              {
                  "_id": "idHtROlVt0-lMwI-NC44-6xQB-a17wxcY97Dti",
                  "tag": "h2",
                  "classes": [
                      "skincare-brand"
                  ],
                  "data": {},
                  "children": [
                      "idLD44RuGh-sc23-7rtZ-ROR0-ZeppCOII9OD8",
                      "idgTe5Xt3E-C3nk-NfRP-DStn-le7pMNogeVDi",
                      "idOxcYYsxb-nkEP-0zEm-khZZ-n5nXRJAiqz8A"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idjwlCqp1d-KC8v-SwhZ-ZeiF-dVMIWfP6c8JW",
                  "text": true,
                  "v": "i'm Akin Matthews, a designer passionate about creating\n            beautiful,"
              },
              {
                  "_id": "idIGseYcQJ-Zixp-Fs1C-ylXW-zWikwPyoZzTr",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "iduBEVGfWg-1Pff-wuDc-ikKu-8buZcqED4BdC",
                  "text": true,
                  "v": "usable and accessible designs for individuals."
              },
              {
                  "_id": "idiLSXqs3e-FRcc-wCXg-tRb5-FdH7MiOJGOGo",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idjwlCqp1d-KC8v-SwhZ-ZeiF-dVMIWfP6c8JW",
                      "idIGseYcQJ-Zixp-Fs1C-ylXW-zWikwPyoZzTr",
                      "iduBEVGfWg-1Pff-wuDc-ikKu-8buZcqED4BdC"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idzj6brBgs-lkkd-IIUD-RRGz-nrOMyKgYtHBj",
                  "text": true,
                  "v": "About me"
              },
              {
                  "_id": "idkNcEMApz-PolL-GCz6-Mhuh-Cg8jDMLXAY9l",
                  "tag": "h5",
                  "classes": [
                      "about-me"
                  ],
                  "data": {},
                  "children": [
                      "idzj6brBgs-lkkd-IIUD-RRGz-nrOMyKgYtHBj"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idRf9fXrga-P6oN-FEl7-17jH-PZTC3Z9z2Vde",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id5UD9UGvr-xJdM-Yiv1-jk20-bvSggM7jqSHq",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idkNcEMApz-PolL-GCz6-Mhuh-Cg8jDMLXAY9l",
                      "idRf9fXrga-P6oN-FEl7-17jH-PZTC3Z9z2Vde"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idQD89DCVz-Z7Zx-8xUU-NTTW-xGXGdO8HlxDr",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id5UD9UGvr-xJdM-Yiv1-jk20-bvSggM7jqSHq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idtyYS7FwI-2kWs-ZqXl-dekq-RRg8yNX3Lshe",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idHtROlVt0-lMwI-NC44-6xQB-a17wxcY97Dti",
                      "idiLSXqs3e-FRcc-wCXg-tRb5-FdH7MiOJGOGo",
                      "idQD89DCVz-Z7Zx-8xUU-NTTW-xGXGdO8HlxDr"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idgBh0o68i-zKCZ-IJVj-CbJy-Cx2tdAZP8wyn",
                  "tag": "img",
                  "classes": [
                      "routines"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709249893554-Frame%201216400724%20%285%29.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idLeFXloae-I0px-Td9J-BOX4-382Nz7I4tJWH",
                  "tag": "div",
                  "classes": [
                      "routine_img-ctn"
                  ],
                  "data": {},
                  "children": [
                      "idgBh0o68i-zKCZ-IJVj-CbJy-Cx2tdAZP8wyn"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id7bGSf3JN-b3Hc-VSLo-STbk-vy55UCL2WSac",
                  "tag": "div",
                  "classes": [
                      "website-redesign"
                  ],
                  "data": {},
                  "children": [
                      "idtyYS7FwI-2kWs-ZqXl-dekq-RRg8yNX3Lshe",
                      "idLeFXloae-I0px-Td9J-BOX4-382Nz7I4tJWH"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idE1cAx0Rl-zHzu-TAuX-HhIP-brF8XBpYwnEc",
                  "text": true,
                  "v": "My work skills"
              },
              {
                  "_id": "idFfmoFgwH-nuQ6-atm3-cBrJ-sXGC06hDiUzJ",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idE1cAx0Rl-zHzu-TAuX-HhIP-brF8XBpYwnEc"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idilH8vE4u-oR0y-EeC7-47JI-nzs5gWuSJFt9",
                  "text": true,
                  "v": "Tailordom is built and designed for perfomance so websites load in\n          real time."
              },
              {
                  "_id": "idagZGNfW3-fAC5-7yLQ-OrJA-tvRYQOY01kKw",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idErrzhqbr-6n3f-qg7i-hnpt-HtdQc6Df99pU",
                  "text": true,
                  "v": "Launch your site in minutes with Quick Load-up."
              },
              {
                  "_id": "idKLZKvBgP-zwXr-cVJM-ewJ2-dw4BifrSH50r",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idilH8vE4u-oR0y-EeC7-47JI-nzs5gWuSJFt9",
                      "idagZGNfW3-fAC5-7yLQ-OrJA-tvRYQOY01kKw",
                      "idErrzhqbr-6n3f-qg7i-hnpt-HtdQc6Df99pU"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id2EEeT5dR-5QBY-hfqv-b3qs-QKKttH2s5aQ1",
                  "tag": "div",
                  "classes": [
                      "work-skills"
                  ],
                  "data": {},
                  "children": [
                      "idFfmoFgwH-nuQ6-atm3-cBrJ-sXGC06hDiUzJ",
                      "idKLZKvBgP-zwXr-cVJM-ewJ2-dw4BifrSH50r"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNAaAFulG-bSoB-jGdv-z0IV-jAbzCUbiJpwz",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709150564821-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idV1b3wLSI-xMTb-QUY0-y8rv-So1PtsplfzOQ",
                  "text": true,
                  "v": "Hardwork"
              },
              {
                  "_id": "id3b3gZdax-JGag-J9kV-ycbl-3RnsPjnDVecJ",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idV1b3wLSI-xMTb-QUY0-y8rv-So1PtsplfzOQ"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idLU4LDDpQ-io2W-mWkP-Ts1s-v09jOJTf6vlF",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n            tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idWQtbs353-bimD-Zr1i-hK1s-bwVlEhWgpL7C",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idLU4LDDpQ-io2W-mWkP-Ts1s-v09jOJTf6vlF"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idLc9kenrR-rq2b-aZd7-HKJk-SON8b0tKWntS",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idgryanX7t-74ih-cKH6-seWU-Gh7MmVUnbIP6",
                  "tag": "div",
                  "classes": [
                      "soft_skill"
                  ],
                  "data": {},
                  "children": [
                      "idNAaAFulG-bSoB-jGdv-z0IV-jAbzCUbiJpwz",
                      "id3b3gZdax-JGag-J9kV-ycbl-3RnsPjnDVecJ",
                      "idWQtbs353-bimD-Zr1i-hK1s-bwVlEhWgpL7C",
                      "idLc9kenrR-rq2b-aZd7-HKJk-SON8b0tKWntS"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idgYCC6nJb-Kmql-QsTJ-ncIA-yhExBoomiMTR",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709150997038-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idUnroELP7-A2gh-b7A7-2qjA-atlbrM0PwHFa",
                  "text": true,
                  "v": "Resilence"
              },
              {
                  "_id": "ideXKcSE9w-3NDi-CFKD-qKkc-bdNyOO0gCk5c",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idUnroELP7-A2gh-b7A7-2qjA-atlbrM0PwHFa"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idBptjoAu9-R0An-an61-cGKS-GA4jxfcRC8Nb",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n            tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idRkM2dkIc-KJbX-nC1H-vcq8-bvT1L1ZIt5kv",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idBptjoAu9-R0An-an61-cGKS-GA4jxfcRC8Nb"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idzTv245KM-LTxH-ePbc-MUsw-VlUacjXlw6SC",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idc9GCUiqv-ysgh-RzEv-gcv7-RhXQVk7c6ED0",
                  "tag": "div",
                  "classes": [
                      "soft_skill"
                  ],
                  "data": {},
                  "children": [
                      "idgYCC6nJb-Kmql-QsTJ-ncIA-yhExBoomiMTR",
                      "ideXKcSE9w-3NDi-CFKD-qKkc-bdNyOO0gCk5c",
                      "idRkM2dkIc-KJbX-nC1H-vcq8-bvT1L1ZIt5kv",
                      "idzTv245KM-LTxH-ePbc-MUsw-VlUacjXlw6SC"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idm5B5IKsI-f5GR-dP7n-22CN-g5qXMKRBzxKC",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709151228811-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idOw2Bkz7d-JE5H-Srac-cwja-Rx86kmM9nEop",
                  "text": true,
                  "v": "Integrity"
              },
              {
                  "_id": "idgCk2bQ0e-T2ry-CEUE-vZ5B-9pTRl5wlCK4t",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idOw2Bkz7d-JE5H-Srac-cwja-Rx86kmM9nEop"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idFQYa0xbQ-5NfM-3eTk-h9J8-hMXPg27y2zY8",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n            tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idaGQTgG8a-3tpZ-Cglf-kEXT-4wlAaFHt0yTF",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFQYa0xbQ-5NfM-3eTk-h9J8-hMXPg27y2zY8"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id1G1QAMmO-bjpq-8uIp-3ScX-CTAiq15w90F8",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idf5NLSJ3C-IoHV-1oaW-alC8-LKvnp6UwjXoR",
                  "tag": "div",
                  "classes": [
                      "soft_skill"
                  ],
                  "data": {},
                  "children": [
                      "idm5B5IKsI-f5GR-dP7n-22CN-g5qXMKRBzxKC",
                      "idgCk2bQ0e-T2ry-CEUE-vZ5B-9pTRl5wlCK4t",
                      "idaGQTgG8a-3tpZ-Cglf-kEXT-4wlAaFHt0yTF",
                      "id1G1QAMmO-bjpq-8uIp-3ScX-CTAiq15w90F8"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idGI5VEDBM-V9ze-mU2N-Eeyx-Y1L1KM8hQcm6",
                  "tag": "div",
                  "classes": [
                      "core"
                  ],
                  "data": {},
                  "children": [
                      "idgryanX7t-74ih-cKH6-seWU-Gh7MmVUnbIP6",
                      "idc9GCUiqv-ysgh-RzEv-gcv7-RhXQVk7c6ED0",
                      "idf5NLSJ3C-IoHV-1oaW-alC8-LKvnp6UwjXoR"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idAs6tFYze-mICV-z4Y7-kHAf-WBXSy60W1Z5a",
                  "text": true,
                  "v": "Interested in working together? Get in touch today."
              },
              {
                  "_id": "idHhhFuBk4-JwpW-GbJs-rdYg-0Ih3tP2Frh9M",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idAs6tFYze-mICV-z4Y7-kHAf-WBXSy60W1Z5a"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idVWEknAAM-3mFL-INq1-qd5j-Zw09QJy5t6WY",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              },
              {
                  "_id": "idkard4TVC-GJXB-3468-5uyQ-iS2RemBjMHoj",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idxWu7J6kC-0EB2-qAEY-WpDY-hZMmvVZPlxik",
                  "text": true,
                  "v": "eiusmod tempor incididunt ut labore et dolore magna aliqua."
              },
              {
                  "_id": "ideYwYEehF-ToJ2-4tFi-XEPV-ZmvEQyX7NDki",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idVWEknAAM-3mFL-INq1-qd5j-Zw09QJy5t6WY",
                      "idkard4TVC-GJXB-3468-5uyQ-iS2RemBjMHoj",
                      "idxWu7J6kC-0EB2-qAEY-WpDY-hZMmvVZPlxik"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "ido1TrLT34-5Ci1-iowV-kMCx-f1O0fq0X52OJ",
                  "tag": "div",
                  "classes": [
                      "working-page-top"
                  ],
                  "data": {},
                  "children": [
                      "idHhhFuBk4-JwpW-GbJs-rdYg-0Ih3tP2Frh9M",
                      "ideYwYEehF-ToJ2-4tFi-XEPV-ZmvEQyX7NDki"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idlpXrLWFl-YNyq-HReu-hzcg-ZbCWgU0OMSf6",
                  "text": true,
                  "v": ">"
              },
              {
                  "_id": "idOrqt98ge-YTTD-MV3y-vGWI-5GOeCzMLfiBS",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idlpXrLWFl-YNyq-HReu-hzcg-ZbCWgU0OMSf6"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id1g4qgHTv-CyPb-MIwJ-x4xZ-gfESUKcl4VTz",
                  "tag": "div",
                  "classes": [
                      "next-button"
                  ],
                  "data": {},
                  "children": [
                      "idOrqt98ge-YTTD-MV3y-vGWI-5GOeCzMLfiBS"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idTt7FWYXn-qVIJ-l6ai-uRrV-lwEMlU6jaxdd",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idDGwL2NaP-y8uY-MEua-0JWx-s3jKd6QEmw4O",
                  "tag": "div",
                  "classes": [
                      "working-page"
                  ],
                  "data": {},
                  "children": [
                      "ido1TrLT34-5Ci1-iowV-kMCx-f1O0fq0X52OJ",
                      "id1g4qgHTv-CyPb-MIwJ-x4xZ-gfESUKcl4VTz",
                      "idTt7FWYXn-qVIJ-l6ai-uRrV-lwEMlU6jaxdd"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idMQDL9C2D-6Mt4-4XWp-d11l-OSbLnsPOuPCH",
                  "tag": "div",
                  "classes": [
                      "working-together"
                  ],
                  "data": {},
                  "children": [
                      "idDGwL2NaP-y8uY-MEua-0JWx-s3jKd6QEmw4O"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idx60DxKXW-uG8U-sFlT-IIjP-cBuXzPQsfSKY",
                  "text": true,
                  "v": "Follow me"
              },
              {
                  "_id": "idxLxDyK43-vB87-plB3-s7qX-3rWiLVwpZxzV",
                  "tag": "h3",
                  "classes": [
                      "follow-me"
                  ],
                  "data": {},
                  "children": [
                      "idx60DxKXW-uG8U-sFlT-IIjP-cBuXzPQsfSKY"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idrVE56awZ-2Bbc-HlUW-PKUy-mOqDo86zXW0c",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709087810837-linkedin.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idXKZwNGib-Bu56-U60P-eOZg-mWBGNaadKG9b",
                  "text": true,
                  "v": "Linkedin"
              },
              {
                  "_id": "id6BWPLGIi-0dmz-EjuJ-mw1e-tY75CdEkPSVB",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idXKZwNGib-Bu56-U60P-eOZg-mWBGNaadKG9b"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idI8Wlhqzd-EmPj-WCqi-yPZ1-lgHFdPga0QLZ",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idrVE56awZ-2Bbc-HlUW-PKUy-mOqDo86zXW0c",
                      "id6BWPLGIi-0dmz-EjuJ-mw1e-tY75CdEkPSVB"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idjLlUh1pZ-x6zz-kCCF-RQXE-DKQDCYTkaFz3",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088090774-twitter.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id4lwUncPY-lIJv-Q3H1-Jhui-RV196TJ46nlK",
                  "text": true,
                  "v": "Twitter"
              },
              {
                  "_id": "idoX0kJ6Ov-OwOs-nfFt-Y4rQ-u1n50oyYM0lf",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id4lwUncPY-lIJv-Q3H1-Jhui-RV196TJ46nlK"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idWdBEtoAV-1KaN-3xUu-dakF-ck0HtCyGS8om",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idjLlUh1pZ-x6zz-kCCF-RQXE-DKQDCYTkaFz3",
                      "idoX0kJ6Ov-OwOs-nfFt-Y4rQ-u1n50oyYM0lf"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "ideE1jjKmL-X3BK-D5X4-vUGf-ZOkp4WOJXrO1",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088195528-instagram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idtXbei18Y-LkAu-5wCk-jbxa-gujNTE32oRCh",
                  "text": true,
                  "v": "Instagram"
              },
              {
                  "_id": "ideOW4ioHy-y60J-eQn8-Ny9N-NiF08RTtCqLb",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idtXbei18Y-LkAu-5wCk-jbxa-gujNTE32oRCh"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id6BcIUube-RYR3-jAHS-zQmm-cckmLcRMNDWo",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "ideE1jjKmL-X3BK-D5X4-vUGf-ZOkp4WOJXrO1",
                      "ideOW4ioHy-y60J-eQn8-Ny9N-NiF08RTtCqLb"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idZYn7bynC-gdly-CKGp-chwN-MBqCWj0Zw7OB",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idI8Wlhqzd-EmPj-WCqi-yPZ1-lgHFdPga0QLZ",
                      "idWdBEtoAV-1KaN-3xUu-dakF-ck0HtCyGS8om",
                      "id6BcIUube-RYR3-jAHS-zQmm-cckmLcRMNDWo"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idmPNHIL5e-Zfsr-ZS9F-8TCU-eBnLBdE7CS6Y",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088362442-Facebook.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "ide7Z7ulEh-gHw1-mjhY-nFc0-Gr7HuPBa34qm",
                  "text": true,
                  "v": "Facebook"
              },
              {
                  "_id": "id2V21F2CE-ECez-JQ4y-Z1GQ-Qnrss6y5LXka",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ide7Z7ulEh-gHw1-mjhY-nFc0-Gr7HuPBa34qm"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idR9pOKKTw-1jzN-80TX-yxzF-DcFDPaiPLjr8",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idmPNHIL5e-Zfsr-ZS9F-8TCU-eBnLBdE7CS6Y",
                      "id2V21F2CE-ECez-JQ4y-Z1GQ-Qnrss6y5LXka"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idC40fnIrH-yPpp-WPci-CRnU-xJyc5Stc1JRx",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088546423-youtube.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idKEam6u5q-rLMr-grNa-dTOj-YMEC6qnaossw",
                  "text": true,
                  "v": "Youtube"
              },
              {
                  "_id": "iduKh33r64-z6mh-h2pi-giFY-3ePcaqRhMX8u",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idKEam6u5q-rLMr-grNa-dTOj-YMEC6qnaossw"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id1G9RjkNb-YzzO-AkTi-47aM-UdcMhYNE31Da",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idC40fnIrH-yPpp-WPci-CRnU-xJyc5Stc1JRx",
                      "iduKh33r64-z6mh-h2pi-giFY-3ePcaqRhMX8u"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idBEIoMisL-fvli-gBGz-vBzc-TEqcKrhKj64D",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088617221-dribbble.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idLnWLxPdA-J6uJ-OYXW-Jff7-cSTLlMfoBYJm",
                  "text": true,
                  "v": "Dribble"
              },
              {
                  "_id": "id54fcodsh-65np-Sqkk-nx6r-ucBRpfOzQOli",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idLnWLxPdA-J6uJ-OYXW-Jff7-cSTLlMfoBYJm"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "ids3Mvmg4m-n9wi-tZSf-F6L4-49nLlSyUEr5l",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idBEIoMisL-fvli-gBGz-vBzc-TEqcKrhKj64D",
                      "id54fcodsh-65np-Sqkk-nx6r-ucBRpfOzQOli"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idj83Knopl-iBl2-QCdC-XJ2l-iT3Mg7nUkJfo",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idR9pOKKTw-1jzN-80TX-yxzF-DcFDPaiPLjr8",
                      "id1G9RjkNb-YzzO-AkTi-47aM-UdcMhYNE31Da",
                      "ids3Mvmg4m-n9wi-tZSf-F6L4-49nLlSyUEr5l"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idz2Ynwt8a-V0T0-TioY-FfkQ-9bxY5LxNyCat",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089122414-telegram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id4HIlRdyO-QbEM-pSpX-2aYv-EIdfza9w1vHS",
                  "text": true,
                  "v": "Telegram"
              },
              {
                  "_id": "idxyEjgI8u-Xbg2-G6y4-5UWG-pGtcNQlKBgvd",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id4HIlRdyO-QbEM-pSpX-2aYv-EIdfza9w1vHS"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idxwJZKtzB-eGGF-oDq7-48m5-RLIGPaunsbaP",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idz2Ynwt8a-V0T0-TioY-FfkQ-9bxY5LxNyCat",
                      "idxyEjgI8u-Xbg2-G6y4-5UWG-pGtcNQlKBgvd"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id3EOJXG8U-f11Q-POi7-BkPq-exSMqpFMxWia",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089177123-whatsapp.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idrlJWlHu0-3IjN-9XtA-l87b-dZY71CfY9jx7",
                  "text": true,
                  "v": "Whatsapp"
              },
              {
                  "_id": "idKKAs3VN5-YwkH-93th-HoxI-fOukUTDCmETT",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idrlJWlHu0-3IjN-9XtA-l87b-dZY71CfY9jx7"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id0lom8PzC-6TK7-vjXo-59o8-ZR4AOxQaUnWi",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "id3EOJXG8U-f11Q-POi7-BkPq-exSMqpFMxWia",
                      "idKKAs3VN5-YwkH-93th-HoxI-fOukUTDCmETT"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idXrIlo4mt-Zvl9-0tT5-f4RJ-06np4XttDSe0",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089232947-behance.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idINBGdQBp-SCNA-G3mH-XRH8-TbZo1Fa8JGAI",
                  "text": true,
                  "v": "Behance"
              },
              {
                  "_id": "idWBWUwCfU-nqDN-6W5W-7CST-BEjDVZaXUD0m",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idINBGdQBp-SCNA-G3mH-XRH8-TbZo1Fa8JGAI"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idNQ3IEfSe-x9a2-Nzu7-G2EH-tg7ZzhWK91GM",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idXrIlo4mt-Zvl9-0tT5-f4RJ-06np4XttDSe0",
                      "idWBWUwCfU-nqDN-6W5W-7CST-BEjDVZaXUD0m"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idvzm42cD0-8OUn-1xd6-znqK-Evf7LQleuWqi",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idxwJZKtzB-eGGF-oDq7-48m5-RLIGPaunsbaP",
                      "id0lom8PzC-6TK7-vjXo-59o8-ZR4AOxQaUnWi",
                      "idNQ3IEfSe-x9a2-Nzu7-G2EH-tg7ZzhWK91GM"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id9W5LKQXy-8dd2-yOcJ-gEiW-4axjhta3PsuK",
                  "tag": "div",
                  "classes": [
                      "follow"
                  ],
                  "data": {},
                  "children": [
                      "idxLxDyK43-vB87-plB3-s7qX-3rWiLVwpZxzV",
                      "idZYn7bynC-gdly-CKGp-chwN-MBqCWj0Zw7OB",
                      "idj83Knopl-iBl2-QCdC-XJ2l-iT3Mg7nUkJfo",
                      "idvzm42cD0-8OUn-1xd6-znqK-Evf7LQleuWqi"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idwZqBYK4B-bOCr-ARu2-6eLi-k1zNGymBNMSW",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id9W5LKQXy-8dd2-yOcJ-gEiW-4axjhta3PsuK"
                  ],
                  "type": "Contact section"
              },
              {
                  "_id": "idZrfaS1ZG-slAj-zhVm-Wb4A-6V1pv3T3CjX4",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idIi2ZIJbR-Wvlv-AQNX-ZnyE-PLKN2oLePzpm",
                  "tag": "h3",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {},
                  "children": [
                      "idZrfaS1ZG-slAj-zhVm-Wb4A-6V1pv3T3CjX4"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idpQqkt9fE-4yii-YI4F-iReO-mfGWrSYHIupp",
                  "text": true,
                  "v": "I'm Akin Matthews, a designer passionate about creating"
              },
              {
                  "_id": "idAvvNCgf6-aHKI-DfvE-XkTA-TKh701vtblCj",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idFB3d9Z36-MVU8-CuEZ-A2Zu-yrLwt0Q0hcjc",
                  "text": true,
                  "v": "beautiful, usable and accessible designs for individuals."
              },
              {
                  "_id": "idpZJ6spca-zoKc-JT35-QRfE-cRuILRdvktQl",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idpQqkt9fE-4yii-YI4F-iReO-mfGWrSYHIupp",
                      "idAvvNCgf6-aHKI-DfvE-XkTA-TKh701vtblCj",
                      "idFB3d9Z36-MVU8-CuEZ-A2Zu-yrLwt0Q0hcjc"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idkLL8Y0k4-7vju-hmgB-u2zQ-CyDrylb6tvji",
                  "tag": "div",
                  "classes": [
                      "footer-up"
                  ],
                  "data": {},
                  "children": [
                      "idIi2ZIJbR-Wvlv-AQNX-ZnyE-PLKN2oLePzpm",
                      "idpZJ6spca-zoKc-JT35-QRfE-cRuILRdvktQl"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNYEFa1uB-mVcN-aSGN-kxMn-5froWv25bzBD",
                  "text": true,
                  "v": "Product"
              },
              {
                  "_id": "idqSQuI2y1-MT5w-OdVn-wtLY-EZbKzi47hYgj",
                  "tag": "h4",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNYEFa1uB-mVcN-aSGN-kxMn-5froWv25bzBD"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idoEnqQdB2-vp3l-fLwu-mHo2-G51dI4CgQU13",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idi8555cnR-3AEr-JIPF-ClGp-7lJLoMqlUDhI",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idoEnqQdB2-vp3l-fLwu-mHo2-G51dI4CgQU13"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idFpyhwZs5-7yRC-k1Ce-YKjg-1xViDImxSAJL",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "id322rDQEN-KG7q-MmSY-L0ca-Vs402cM2tT9S",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFpyhwZs5-7yRC-k1Ce-YKjg-1xViDImxSAJL"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idJCcvrlC3-PYeR-5iKm-NsOX-y8iVcNHL0uww",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idh0h7wPGd-dJYW-FZIU-JnVr-jMvhp0ZW0RiE",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idJCcvrlC3-PYeR-5iKm-NsOX-y8iVcNHL0uww"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idRg6v4kpt-CFXS-9pYO-Bq8o-MObknAu09qjc",
                  "tag": "div",
                  "classes": [
                      "footer-down"
                  ],
                  "data": {},
                  "children": [
                      "idqSQuI2y1-MT5w-OdVn-wtLY-EZbKzi47hYgj",
                      "idi8555cnR-3AEr-JIPF-ClGp-7lJLoMqlUDhI",
                      "id322rDQEN-KG7q-MmSY-L0ca-Vs402cM2tT9S",
                      "idh0h7wPGd-dJYW-FZIU-JnVr-jMvhp0ZW0RiE"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idALSI0mxN-qH98-CJWz-4Xrf-Ko1qf3pjBkxF",
                  "tag": "div",
                  "classes": [
                      "footer"
                  ],
                  "data": {},
                  "children": [
                      "idkLL8Y0k4-7vju-hmgB-u2zQ-CyDrylb6tvji",
                      "idRg6v4kpt-CFXS-9pYO-Bq8o-MObknAu09qjc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idqpS3M2jw-1IWZ-qECl-gn3u-OslN9l7Vi9MM",
                  "text": true,
                  "v": "Copyright © Tailorflow"
              },
              {
                  "_id": "idNnWSV3jP-J5JN-9cTO-2DBS-EYshCGt0Drpf",
                  "tag": "p",
                  "classes": [
                      "copy-right"
                  ],
                  "data": {},
                  "children": [
                      "idqpS3M2jw-1IWZ-qECl-gn3u-OslN9l7Vi9MM"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idgUUM7hId-D50O-woOZ-fSya-CGlna2X10PQk",
                  "tag": "footer",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idALSI0mxN-qH98-CJWz-4Xrf-Ko1qf3pjBkxF",
                      "idNnWSV3jP-J5JN-9cTO-2DBS-EYshCGt0Drpf"
                  ],
                  "type": "Footer-section"
              }
          ],
            "styles":{
              "data": {
                  "appliedStylesMap": {},
                  "breakpoints": {
                  }, 
                  "macros": [], "migrations": {"stylesNext": true}, "swatches": []
              },
              "style":[
                  {
                      "style_id": "2f66109f-cb76-4335-9877-acc5c18b0418",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "*, ::before, ::after",
                          "sel": "*, ::before, ::after",
                          "styleLess": "box-sizing: border-box;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "29d8d64b-b967-488b-8ce3-c4693ee1201e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "html, body",
                          "sel": "html, body",
                          "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1300px; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "ecc2f501-d635-4459-b3eb-73d7ef3036bb",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "body",
                          "sel": "body",
                          "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": "body",
                                  "styleLess": "font-family: inter; padding-left: 30px; width: 90%;"
                              },
                              "medium": {
                                  "sel": "body",
                                  "styleLess": "width: 95%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "9f5dc677-3862-4038-8d31-87e0ca9dc600",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "img",
                          "sel": "img",
                          "styleLess": "display: block;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "2b30d659-55f0-4b04-932a-0dae35164a09",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "ul",
                          "sel": "ul",
                          "styleLess": "list-style: none; padding: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "6c11cc58-499a-46a0-b93c-ae8f5b3a94dd",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "a",
                          "sel": "a",
                          "styleLess": "text-decoration: none; color: black;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a3b97a0f-bddc-426d-834d-1ee2bfff0851",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "p, h1, h2, h3, h4, h5, h6",
                          "sel": "p, h1, h2, h3, h4, h5, h6",
                          "styleLess": "overflow-wrap: break-word; margin: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "78cf768a-5abd-45ae-bc2a-27cd5889f1e4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "#main",
                          "sel": "#main",
                          "styleLess": "padding: 2em 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7fd53ad8-283c-43ec-8550-d0b408c3476e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".note",
                          "styleLess": "line-height: 25px; margin-top: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "f5c5e7a1-8d24-44eb-bf20-8f41a23e40ad",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "hr",
                          "sel": "hr",
                          "styleLess": "margin: 2.5em 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "1d58ce51-1220-4991-a24c-c5c68a428a3d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header",
                          "styleLess": "display: flex; justify-content: space-between; align-items: center; gap: 10px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "8fe6aa49-eade-4e38-9e33-3efe906c244c",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".menu-icon",
                          "styleLess": "width: 40px; height: 40px;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: block;"
                              },
                              "medium": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "b8c92a7b-091f-4ad2-9686-2109f3531bc2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".tailorflow",
                          "styleLess": "text-decoration: none; font-weight: 600; font-size: 25px; color: rgb(0, 52, 53);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "5830e6b0-4748-4200-82f7-e44713ff18b2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header-list",
                          "styleLess": "display: none;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-list",
                                  "styleLess": "display: none;"
                              },
                              "medium": {
                                  "sel": ".header-list",
                                  "styleLess": "display: flex; padding: 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "6a7a8307-1971-4a78-b943-bb78071b380b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".past-projects",
                          "styleLess": "text-align: center; font-size: 30px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "eaf0880e-4e29-4d6c-8073-a1a58cdc7f01",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".linestyle",
                          "styleLess": "display: flex; gap: 0.5em; margin: 0.6em 0px 0px; width: 250px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "581c876c-da7d-4d39-8a15-317c0ffb9924",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".lineheight",
                          "styleLess": "width: 17px; height: 1px; align-self: center; background-color: rgb(152, 162, 179);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "c1737efe-4c53-4bc0-a626-126091f6e5a3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".skincare-brand",
                          "styleLess": "margin: 0px; font-size: 30px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".skincare-brand",
                                  "styleLess": "margin: 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "45d3e7a4-ce5f-49c7-8b73-d6536b02c37b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow-image",
                          "styleLess": "width: 24px; height: 24px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "bca07966-7d44-4671-bbf9-8801ce582c30",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".view-project",
                          "styleLess": "margin: 0px; font-size: 0.85em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "961798d5-5256-42f6-ab06-156e5b54ee25",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".view",
                          "styleLess": "width: 109px; padding: 0px; border-bottom: 1px solid;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "2fb8c9ee-9e42-43fe-a881-5676835efafe",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow",
                          "styleLess": "display: flex; align-items: center; width: 150px; gap: 3px; margin: 2.2em 0px 0px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".arrow",
                                  "styleLess": "display: flex; align-items: center; width: 150px; gap: 3px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "d16129b0-c3e4-4561-83a8-2177469ed272",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".about-me",
                          "styleLess": "font-size: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "5dc5f755-b430-4b8d-8f64-7fe266bafc8f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".routine_img-ctn",
                          "styleLess": "margin-bottom: 2em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "bcc0da00-90aa-4eb0-ac6d-02df6d417ee4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".routine_ctn",
                          "styleLess": "width: 95%; overflow: hidden; padding: 0px; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "57b868b9-cda0-4606-9e8e-39772becd5ca",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".routines",
                          "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center; margin-top: 2.2em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "350666e1-6fdb-4202-bec2-36e744c735ca",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".core-image",
                          "styleLess": "width: 50px; height: 50px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "36e9f2bf-5d84-47a7-9729-417afa88696f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".soft_skill",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "1628f4a0-3297-4065-9f9f-03833fa6c3ed",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".work-skills",
                          "styleLess": "padding-bottom: 30px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4709b2e7-b10e-4ebc-98da-00f85f8d1be7",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".work-skills > h2",
                          "styleLess": "padding-bottom: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "d023aa59-d439-4911-9d46-e92e7ed08151",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".article-news > h2",
                          "styleLess": "margin-top: 2.5em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "77fef787-d82e-49c0-a7c2-93ee060f25ca",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".article-redesign",
                          "styleLess": "padding-top: 30px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".article-redesign",
                                  "styleLess": "display: flex; justify-content: space-around; align-items: center; margin: 50px 0px; gap: 200px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "068d9930-5dc5-4d1c-b853-41de9e97f04d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".working-page-top > h2",
                          "styleLess": "line-height: 1.2em; font-size: 2.5em; width: 95%;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "8c06dd2a-74d8-40ec-b1c1-eb6075b4286d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".working-page",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; margin-bottom: 2em;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".working-page",
                                  "styleLess": "flex-direction: column; justify-content: space-between;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "4d92b8fa-6edd-42fb-97c0-924865876e30",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".next-button",
                          "styleLess": "width: 80px; height: 80px; border-radius: 100px; border: 1px solid rgb(102, 112, 133); padding: 15px; display: flex; align-self: flex-end; justify-content: center; font-size: 1.5em; color: rgb(102, 112, 133);",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".next-button",
                                  "styleLess": "margin-left: 450px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "a4478455-3670-4cc1-9fe1-a9173eee3e0d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em; margin-bottom: 2em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "ffad36cd-2f26-45af-a3c6-9e0e8844e869",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow-me",
                          "styleLess": "font-size: 1.5em; letter-spacing: 0.05em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "f50e27f8-9c4b-4853-af7c-60bd10feb2a2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".icon-list",
                          "styleLess": "display: flex; align-items: center; gap: 0.5em; margin-bottom: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "84967ace-3670-4bb2-8b60-b6b077176257",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "450ce4ec-cc87-44e4-ae2b-8fee93c0b17f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer-up, .footer-down",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; font-size: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a8838b71-1020-4275-91bd-f66f107a0b8d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".copy-right",
                          "styleLess": "margin-top: 1.5em; font-size: 0.9em; color: rgb(52, 64, 84);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "1586871a-ea86-4a8f-bcda-af578fab3f18",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".header-icons",
                          "sel": ".header-icons",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              },
                              "medium": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "a0a44f94-bdd9-4f61-a9ea-a8cf845931e3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "li",
                          "sel": "li",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              },
                              "medium": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "0f7e99a5-0996-40d1-b590-65f22854bf3a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".working-page-top",
                          "sel": ".working-page-top",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".working-page-top",
                                  "styleLess": "width: 55%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "6a2e0fa2-7646-4a34-8a87-7ad39231d59c",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".website-redesign",
                          "sel": ".website-redesign",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".website-redesign",
                                  "styleLess": "justify-content: space-between;"
                              },
                              "medium": {
                                  "sel": ".website-redesign",
                                  "styleLess": "display: flex; justify-content: space-around; align-items: center; margin: 50px 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "1c887daf-f63e-4c1e-969e-f4eb4a98c7f2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".follow, .footer",
                          "sel": ".follow, .footer",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow, .footer",
                                  "styleLess": "display: flex; flex-direction: row; align-items: center; justify-content: space-between;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "a37ab57e-11f4-45ea-98d0-7477b5376bad",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".footer-down",
                          "sel": ".footer-down",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".footer-down",
                                  "styleLess": "width: 40%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "357c080a-9f38-435b-adea-7cd4d3886e3b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".article-news",
                          "sel": ".article-news",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".article-news",
                                  "styleLess": "display: flex; justify-content: space-around; gap: 550px; padding-right: 30px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "9dbbae64-b7af-4728-bab3-1934f6ceda27",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".skincare-redesign",
                          "sel": ".skincare-redesign",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".skincare-redesign",
                                  "styleLess": "display: flex;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "a9e57128-c387-4cd4-a580-92af54d5221b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".redesign",
                          "sel": ".redesign",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".redesign",
                                  "styleLess": "padding-top: 100px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "d6b1d014-f74c-4038-bcfd-5830eb9fc7f9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".core",
                          "sel": ".core",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".core",
                                  "styleLess": "display: flex; padding: 50px 20px; gap: 30px; text-align: justify;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "254e1b2d-8a33-45a9-a207-21f46bba96e3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".working-together",
                          "sel": ".working-together",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".working-together",
                                  "styleLess": "display: flex; flex-direction: column; gap: 5em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "931a978a-3a62-434e-8541-339783b7ec1f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".hard",
                          "sel": ".hard",
                          "styleLess": "",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "cf32dae1-ff25-4045-b65b-2612ab4521b2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".routine_txt",
                          "sel": ".routine_txt",
                          "styleLess": "",
                          "type": "class",
                          "variants": {}
                      }
                  }
              ],
            }
        },
        {
            "route":"/about.html",
            "name":"About page",
            "head":{
                "title":"About page",
                "description":"This is the about page for porfolio-1"
            },
            "slug":"gVGW-vQL7gs-Ye87JFZkhgDgFA",           
            "page_id":"idwPRkcJ01-FPJJ-QCP1-OIBG-QChEXbYNx9Sb",
            "nodes":[
              {
                  "_id": "id9fjB0Rsn-LgUG-grWP-IsmE-xCxmiUqImS7F",
                  "tag": "main",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idATkU7So7-Lvr0-Ktns-ld12-8nf0iLwaqaoK",
                      "idY9RVxtcY-81sU-Hf1u-Q8Pt-tbkTN0tZAHO5",
                      "id3oF2NCZi-2h5H-3DJE-5qJN-NKAUrYykiBHV",
                      "iday80VH1R-PFOp-C2TJ-sbka-06UJUPkkaW8V",
                      "idadNqWqiM-8Rw2-jKPc-EgTs-2dHVltp9yz5P",
                      "idVey4TBCo-G1Ea-7KVf-wwR4-R0OkHUIYxFeV",
                      "id3oVhXmlN-sVxX-f1IJ-ko1g-xlca3pCnbNC7",
                      "id12BfBeNs-ztoD-s5OV-hhg8-Kf0ze8QIA9rW",
                      "idq4VS8VY8-GGmd-KUhO-s6Oy-tSbGl9EU5Qeq",
                      "idLYxycTos-nsLC-Ki7B-vWVQ-vBkncLK7pjhk",
                      "idL2m4kkU7-KMiE-O17L-6NcI-8Cuy3qXNYiL9",
                      "idCgze50ui-ZYG0-4J3x-zdGP-xHcSxwa1WD0c"
                  ],
                  "type": "main"
              },
              {
                  "_id": "idVgWZIOuy-cool-xS1x-9apW-r0VzXT48kN15",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idn9mT3MAb-07kL-8q9f-j0bN-NjzkqYvCREyv",
                  "tag": "a",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {
                      "href": "./index.html"
                  },
                  "children": [
                      "idVgWZIOuy-cool-xS1x-9apW-r0VzXT48kN15"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idkk8gPKRl-Bu9H-ZHI5-uFUn-mPN8pIKKs4nZ",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idn9mT3MAb-07kL-8q9f-j0bN-NjzkqYvCREyv"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idtmUV4bYH-2YiZ-0vZM-sNsF-OYyBMyTaFf24",
                  "tag": "ul",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idkk8gPKRl-Bu9H-ZHI5-uFUn-mPN8pIKKs4nZ"
                  ],
                  "type": "unordered list"
              },
              {
                  "_id": "idWx35TA2s-2FAZ-kdN5-ZLqW-dusN6k7GIK0t",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idlUhGn9XB-IWbJ-lRrx-K75y-S4QMt05f3ZTD",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./about.html"
                  },
                  "children": [
                      "idWx35TA2s-2FAZ-kdN5-ZLqW-dusN6k7GIK0t"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idMPgpRUxT-KSV7-P7z5-n0gl-cDm090J0CL5X",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idlUhGn9XB-IWbJ-lRrx-K75y-S4QMt05f3ZTD"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "id3DQu0wPI-Lc67-8mgt-r4kl-KyyWTn9Rs4wU",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idmS4a6eLU-78sL-d5Kg-d9fp-woKgPK5Cv3ar",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./portfolioDetails.html"
                  },
                  "children": [
                      "id3DQu0wPI-Lc67-8mgt-r4kl-KyyWTn9Rs4wU"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idvjJFMvn0-0dg1-MJkk-JVSe-k1eaSIf2qyjC",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idmS4a6eLU-78sL-d5Kg-d9fp-woKgPK5Cv3ar"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idJaeq2wf2-ZHIm-ZwEk-2jSr-nKIcaaGpt3Rh",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idV5gbGsGg-9oiy-7QXJ-OJHT-X1uGgn8AJh8q",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./contact.html"
                  },
                  "children": [
                      "idJaeq2wf2-ZHIm-ZwEk-2jSr-nKIcaaGpt3Rh"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idagY0WD1q-EZw5-tY1m-PzCI-Rsx9IG1OMNMU",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idV5gbGsGg-9oiy-7QXJ-OJHT-X1uGgn8AJh8q"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idcXcUgIT5-C4VL-xl4L-w1tE-7eH69sKTwMJo",
                  "tag": "ul",
                  "classes": [
                      "header",
                      "header-list"
                  ],
                  "data": {},
                  "children": [
                      "idMPgpRUxT-KSV7-P7z5-n0gl-cDm090J0CL5X",
                      "idvjJFMvn0-0dg1-MJkk-JVSe-k1eaSIf2qyjC",
                      "idagY0WD1q-EZw5-tY1m-PzCI-Rsx9IG1OMNMU"
                  ],
                  "type": "uno"
              },
              {
                  "_id": "id54t750pI-w7jD-haNV-2BFb-ivC7hxWq97m6",
                  "tag": "img",
                  "classes": [
                      "menu-icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id8Rt6gXvG-o0Qy-GxBF-7jKt-yF12tRLXxdIB",
                  "tag": "nav",
                  "classes": [
                      "header"
                  ],
                  "data": {},
                  "children": [
                      "idtmUV4bYH-2YiZ-0vZM-sNsF-OYyBMyTaFf24",
                      "idcXcUgIT5-C4VL-xl4L-w1tE-7eH69sKTwMJo",
                      "id54t750pI-w7jD-haNV-2BFb-ivC7hxWq97m6"
                  ],
                  "type": "Navigation"
              },
              {
                  "_id": "idATkU7So7-Lvr0-Ktns-ld12-8nf0iLwaqaoK",
                  "tag": "header",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id8Rt6gXvG-o0Qy-GxBF-7jKt-yF12tRLXxdIB"
                  ],
                  "type": "header"
              },
              {
                  "_id": "idY9RVxtcY-81sU-Hf1u-Q8Pt-tbkTN0tZAHO5",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idrv6i0hBb-t8eI-Xdj1-oVqP-zqASLIQjOqzM",
                  "tag": "img",
                  "classes": [
                      "designer-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709131333422-Frame%201216400725.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "iddViUmRiy-VFRD-Qybg-Vgnv-OzlTzAHE79vF",
                  "tag": "div",
                  "classes": [
                      "banner_img"
                  ],
                  "data": {},
                  "children": [
                      "idrv6i0hBb-t8eI-Xdj1-oVqP-zqASLIQjOqzM"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idBsn7WOdj-AWWH-HQo7-Acd9-DQ57vFEKWW4o",
                  "text": true,
                  "v": "I'm Akin Matthews, a designer based in Orlando, Florida"
              },
              {
                  "_id": "idnTd6ZFP4-cBW7-5vLe-83th-Awrr3l0p39oV",
                  "tag": "h1",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idBsn7WOdj-AWWH-HQo7-Acd9-DQ57vFEKWW4o"
                  ],
                  "type": "Heading 1"
              },
              {
                  "_id": "idgq2iggoR-q6kJ-2hof-qCFA-Y27frGRIqkgB",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Consequat sed molestie\n            faucibus justo habitasse dui cursus. Sit quis vitae morbi sed."
              },
              {
                  "_id": "id16R0XmHV-XlhR-0HuE-g6kW-lND1upwwRLCo",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idgq2iggoR-q6kJ-2hof-qCFA-Y27frGRIqkgB"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idNXIrB8Ei-mwGl-KSjT-u6n8-uXwc8xpm3WmR",
                  "tag": "div",
                  "classes": [
                      "designer-note"
                  ],
                  "data": {},
                  "children": [
                      "idnTd6ZFP4-cBW7-5vLe-83th-Awrr3l0p39oV",
                      "id16R0XmHV-XlhR-0HuE-g6kW-lND1upwwRLCo"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id3oF2NCZi-2h5H-3DJE-5qJN-NKAUrYykiBHV",
                  "tag": "div",
                  "classes": [
                      "designer"
                  ],
                  "data": {},
                  "children": [
                      "iddViUmRiy-VFRD-Qybg-Vgnv-OzlTzAHE79vF",
                      "idNXIrB8Ei-mwGl-KSjT-u6n8-uXwc8xpm3WmR"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iday80VH1R-PFOp-C2TJ-sbka-06UJUPkkaW8V",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "ideLgFPYKc-CEYT-nXhM-9p7a-zWPS2AnnxOqy",
                  "text": true,
                  "v": "About me"
              },
              {
                  "_id": "idtX600PuN-YdcE-6V65-DOkV-yQ2B7qNO0NUt",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ideLgFPYKc-CEYT-nXhM-9p7a-zWPS2AnnxOqy"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "id8uukR79q-R6C3-OHGa-Xocx-KuHWx3f0Xosb",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus."
              },
              {
                  "_id": "idpcMmPtHd-yxUn-tz5y-4Zxo-a7fhgqbSCZFP",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id8uukR79q-R6C3-OHGa-Xocx-KuHWx3f0Xosb"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idGqftYHt2-swvf-aT3f-pAR6-crWQjhmwLHtP",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Quam eget in porttitor\n            egestas amet. Cum et feugiat porta pretium. Suscipit et tempus\n            montes senectus. Lorem ipsum dolor sit amet consectetur. Quam eget\n            in porttitor egestas amet. Cum et feugiat porta pretium. Suscipit et\n            tempus montes senectus."
              },
              {
                  "_id": "id7ILxDb5W-sBJ4-NfNO-cuZJ-NnS3sYgf0J9B",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idGqftYHt2-swvf-aT3f-pAR6-crWQjhmwLHtP"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idimmLEp42-JrKv-nVU8-b57c-DNgXCrJRSAJQ",
                  "tag": "div",
                  "classes": [
                      "about-note"
                  ],
                  "data": {},
                  "children": [
                      "idtX600PuN-YdcE-6V65-DOkV-yQ2B7qNO0NUt",
                      "idpcMmPtHd-yxUn-tz5y-4Zxo-a7fhgqbSCZFP",
                      "id7ILxDb5W-sBJ4-NfNO-cuZJ-NnS3sYgf0J9B"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idTC39pgBG-wrb7-lDwh-8kze-1dGU6AIUrtmY",
                  "tag": "img",
                  "classes": [
                      "designer-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709136229030-image%20238.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idUJhd0p9W-4VZF-2TUe-0Grr-RiQFU5XC8cDQ",
                  "tag": "div",
                  "classes": [
                      "about_img-ctn"
                  ],
                  "data": {},
                  "children": [
                      "idTC39pgBG-wrb7-lDwh-8kze-1dGU6AIUrtmY"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idadNqWqiM-8Rw2-jKPc-EgTs-2dHVltp9yz5P",
                  "tag": "div",
                  "classes": [
                      "about"
                  ],
                  "data": {},
                  "children": [
                      "idimmLEp42-JrKv-nVU8-b57c-DNgXCrJRSAJQ",
                      "idUJhd0p9W-4VZF-2TUe-0Grr-RiQFU5XC8cDQ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idVey4TBCo-G1Ea-7KVf-wwR4-R0OkHUIYxFeV",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id5uhh5FfE-FW9b-zEgB-v5wd-5c21vQCCHQ6l",
                  "text": true,
                  "v": "My past work projects"
              },
              {
                  "_id": "idntyvcHro-TjYS-I5Iz-in7T-ROPqjz1lAUeY",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id5uhh5FfE-FW9b-zEgB-v5wd-5c21vQCCHQ6l"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idwDECifn5-JtNI-Y9DG-Hzar-k3XQ2GcXULfr",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Nisl iaculis quam nulla\n            dolor nunc in. Justo fermentum mauris pellentesque gravida a."
              },
              {
                  "_id": "idLO4cIdBP-Trg8-2lnI-Lbsy-AkVfWeXqJnkE",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idwDECifn5-JtNI-Y9DG-Hzar-k3XQ2GcXULfr"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idrwi2lDaT-PLmp-F5lJ-3Fw0-GJ6lw5Zyv6ok",
                  "text": true,
                  "v": "Browse full resume"
              },
              {
                  "_id": "idLzmfftBE-4dgs-tF3o-zcWl-SRp7DMbsvGCj",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idrwi2lDaT-PLmp-F5lJ-3Fw0-GJ6lw5Zyv6ok"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idnlunHHgT-ixUz-lK0c-jCNB-Gq8TL4kRlv4Z",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idTuJl9Y0s-UtIY-Ihnz-u3b0-YKdmJTcHBxhT",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idLzmfftBE-4dgs-tF3o-zcWl-SRp7DMbsvGCj",
                      "idnlunHHgT-ixUz-lK0c-jCNB-Gq8TL4kRlv4Z"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idW3lNf400-NXXo-hEuE-yQrI-HO8y6XY0YYKN",
                  "tag": "div",
                  "classes": [
                      "works"
                  ],
                  "data": {},
                  "children": [
                      "idntyvcHro-TjYS-I5Iz-in7T-ROPqjz1lAUeY",
                      "idLO4cIdBP-Trg8-2lnI-Lbsy-AkVfWeXqJnkE",
                      "idTuJl9Y0s-UtIY-Ihnz-u3b0-YKdmJTcHBxhT"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idcPmM0ehn-J7Vx-oFwA-C93M-yOmj8UcPcqe1",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idbplM32e8-0gsW-57ah-vPIT-5xXJnucBDDbJ",
                  "tag": "img",
                  "classes": [
                      "about-icon-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709147178763-award_star.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id138kFxvW-iSJx-iKmd-7gnr-eyoNWrZZRTGG",
                  "tag": "div",
                  "classes": [
                      "experience_img"
                  ],
                  "data": {},
                  "children": [
                      "idbplM32e8-0gsW-57ah-vPIT-5xXJnucBDDbJ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idolUVnVOU-MitE-6tLV-StSI-3kFXfM2d9NzZ",
                  "text": true,
                  "v": "Application"
              },
              {
                  "_id": "id6dQkmD6E-4bmt-Ofbt-3n68-2rRkegbC7I43",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idolUVnVOU-MitE-6tLV-StSI-3kFXfM2d9NzZ"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idBf22Q32N-SCpg-DZVX-WYCJ-IrQrz8tuz56O",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idBo7SbtIL-6Hqn-dQoC-R7p6-S8s61VexekrH",
                  "text": true,
                  "v": "2023/2024"
              },
              {
                  "_id": "id5mUAe5If-s53o-q1Lm-W8LI-UI7eSLWHuacc",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idBo7SbtIL-6Hqn-dQoC-R7p6-S8s61VexekrH"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idVhVfkqCX-zO1K-P72z-QCju-IcQLRyEZmbRQ",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "id6dQkmD6E-4bmt-Ofbt-3n68-2rRkegbC7I43",
                      "idBf22Q32N-SCpg-DZVX-WYCJ-IrQrz8tuz56O",
                      "id5mUAe5If-s53o-q1Lm-W8LI-UI7eSLWHuacc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idK8PkktEr-lXLT-BbHs-Hf84-5S3VR48VOIeu",
                  "text": true,
                  "v": "Senior Product Designer"
              },
              {
                  "_id": "ida0e4zCm4-JLx0-K3KH-ZLiz-UX8R8rj023GH",
                  "tag": "h3",
                  "classes": [
                      "company"
                  ],
                  "data": {},
                  "children": [
                      "idK8PkktEr-lXLT-BbHs-Hf84-5S3VR48VOIeu"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idgczdvKQq-YowL-o73S-ydSk-iwChG3OPtXO1",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam\n                  gravida tempus. Pulvinar ut interdum quam nunc venenatis\n                  faucibus leo."
              },
              {
                  "_id": "idyXPWUfKr-DtT2-WQJR-dqjp-BuvJCFtkXj8z",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idgczdvKQq-YowL-o73S-ydSk-iwChG3OPtXO1"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idFATth1B7-AiI1-Wd3f-EWhN-SYoNSr0UeX5s",
                  "tag": "div",
                  "classes": [
                      "experience"
                  ],
                  "data": {},
                  "children": [
                      "idVhVfkqCX-zO1K-P72z-QCju-IcQLRyEZmbRQ",
                      "ida0e4zCm4-JLx0-K3KH-ZLiz-UX8R8rj023GH",
                      "idyXPWUfKr-DtT2-WQJR-dqjp-BuvJCFtkXj8z"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id6TL7pEGj-9xwt-kAE5-QrLm-7gk7hN10wUxf",
                  "tag": "div",
                  "classes": [
                      "about-icon"
                  ],
                  "data": {},
                  "children": [
                      "id138kFxvW-iSJx-iKmd-7gnr-eyoNWrZZRTGG",
                      "idFATth1B7-AiI1-Wd3f-EWhN-SYoNSr0UeX5s"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idpgSpXCPD-kNoY-hY6P-iKTb-4Ec2FcvwET7b",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idKvMMtHyL-g1uc-EiKC-dfRw-98bp1bHY3crP",
                  "tag": "img",
                  "classes": [
                      "about-icon-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709147843604-award_star.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idSLMtwCca-skzh-9bCR-9njg-FXGA00ra1wPO",
                  "tag": "div",
                  "classes": [
                      "experience_img"
                  ],
                  "data": {},
                  "children": [
                      "idKvMMtHyL-g1uc-EiKC-dfRw-98bp1bHY3crP"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idFVZuK6P2-JJ9O-WuiH-gcu3-Zg01V6bSNSye",
                  "text": true,
                  "v": "Company"
              },
              {
                  "_id": "idzCuXxaoM-1MC7-IX9E-GyWX-Th0Pbf5GkZxD",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFVZuK6P2-JJ9O-WuiH-gcu3-Zg01V6bSNSye"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idsqci4ZwD-GCFH-duLn-WBQo-dIM80V31nv2Q",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idXEpmhmRp-EMM3-5YfX-Me3T-znPVb2MGAm2d",
                  "text": true,
                  "v": "2023/2024"
              },
              {
                  "_id": "idFYGfxOJG-47gY-vOfT-ZjFx-2c0XKMj7OAbc",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idXEpmhmRp-EMM3-5YfX-Me3T-znPVb2MGAm2d"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idzytulcoK-gul6-9Rd9-0Sw8-RTAHeU06lUSD",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idzCuXxaoM-1MC7-IX9E-GyWX-Th0Pbf5GkZxD",
                      "idsqci4ZwD-GCFH-duLn-WBQo-dIM80V31nv2Q",
                      "idFYGfxOJG-47gY-vOfT-ZjFx-2c0XKMj7OAbc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idRZBTyK0w-iSVJ-VkkT-i400-IkSoTXgoiNv3",
                  "text": true,
                  "v": "Lead UI/UX Designer"
              },
              {
                  "_id": "idehcDDD92-jqAu-s8cb-zI36-CPsU15vBLJKy",
                  "tag": "h3",
                  "classes": [
                      "company"
                  ],
                  "data": {},
                  "children": [
                      "idRZBTyK0w-iSVJ-VkkT-i400-IkSoTXgoiNv3"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idMjtlNP2i-jMbk-vmkr-Eopl-2bnI1g6fEdgb",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam\n                  gravida tempus. Pulvinar ut interdum quam nunc venenatis\n                  faucibus leo."
              },
              {
                  "_id": "idCE0YwdKB-7aMQ-8nrG-mE3r-eUIjxyHvM07T",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idMjtlNP2i-jMbk-vmkr-Eopl-2bnI1g6fEdgb"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idvLpokJgt-9V2j-XxRd-D8ZO-ebw5k6zVf81l",
                  "tag": "div",
                  "classes": [
                      "experience"
                  ],
                  "data": {},
                  "children": [
                      "idzytulcoK-gul6-9Rd9-0Sw8-RTAHeU06lUSD",
                      "idehcDDD92-jqAu-s8cb-zI36-CPsU15vBLJKy",
                      "idCE0YwdKB-7aMQ-8nrG-mE3r-eUIjxyHvM07T"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxebcI8tO-GYkI-h7pA-PxxT-rqDEb7ex4D73",
                  "tag": "div",
                  "classes": [
                      "about-icon"
                  ],
                  "data": {},
                  "children": [
                      "idSLMtwCca-skzh-9bCR-9njg-FXGA00ra1wPO",
                      "idvLpokJgt-9V2j-XxRd-D8ZO-ebw5k6zVf81l"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idhafX1lbE-RH9z-Hui4-Mkix-jrowuWir3IeR",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idKYy0nsCq-0Ot4-MgBO-9TsS-v1mBuF72I9Tg",
                  "tag": "img",
                  "classes": [
                      "about-icon-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709148318626-award_star.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idhIgyTdeg-Qyt2-09UE-2eVN-v0VRiVhcwqOw",
                  "tag": "div",
                  "classes": [
                      "experience_img"
                  ],
                  "data": {},
                  "children": [
                      "idKYy0nsCq-0Ot4-MgBO-9TsS-v1mBuF72I9Tg"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idHeQ9JUbG-imzx-8Eg3-QkfK-XXnwAWwec0yo",
                  "text": true,
                  "v": "Business"
              },
              {
                  "_id": "idRaclJbHK-ehZS-yo1u-XvS6-rDcj7vdURpZ0",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idHeQ9JUbG-imzx-8Eg3-QkfK-XXnwAWwec0yo"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idDKhcPQ4i-JqsQ-CyuV-xMN1-RiC6z95rYYT0",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idV2wrRWPE-eFC1-pwis-mQMQ-6an6fJhYH9cl",
                  "text": true,
                  "v": "2023/2024"
              },
              {
                  "_id": "idFFlbA20s-gtC4-Z6aA-uSe7-81duJbiEbKih",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idV2wrRWPE-eFC1-pwis-mQMQ-6an6fJhYH9cl"
                  ],
                  "type": "Paragrpah"
              },
              {
                  "_id": "idO3xORcVm-cEwn-NzGZ-Yi7a-d52rCXsyHJp1",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idRaclJbHK-ehZS-yo1u-XvS6-rDcj7vdURpZ0",
                      "idDKhcPQ4i-JqsQ-CyuV-xMN1-RiC6z95rYYT0",
                      "idFFlbA20s-gtC4-Z6aA-uSe7-81duJbiEbKih"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idwsGU7YlQ-omTa-JhAM-2hWz-2YvaPQ4Bdgzw",
                  "text": true,
                  "v": "Mobile Engineer"
              },
              {
                  "_id": "id6GPrrDV7-1c2w-HCRA-oO8f-3UiePT3FbOfd",
                  "tag": "h3",
                  "classes": [
                      "company"
                  ],
                  "data": {},
                  "children": [
                      "idwsGU7YlQ-omTa-JhAM-2hWz-2YvaPQ4Bdgzw"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idylQl7mC6-hpzi-FWtK-LM3h-AfklDexlPKBQ",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam\n                  gravida tempus. Pulvinar ut interdum quam nunc venenatis\n                  faucibus leo."
              },
              {
                  "_id": "idnrXva4VA-gjbd-5Ji1-Ixb6-U3pe0b48kvll",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idylQl7mC6-hpzi-FWtK-LM3h-AfklDexlPKBQ"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idGUBwZi9o-HG4w-mZ5A-357B-Peocoj3nVabG",
                  "tag": "div",
                  "classes": [
                      "experience"
                  ],
                  "data": {},
                  "children": [
                      "idO3xORcVm-cEwn-NzGZ-Yi7a-d52rCXsyHJp1",
                      "id6GPrrDV7-1c2w-HCRA-oO8f-3UiePT3FbOfd",
                      "idnrXva4VA-gjbd-5Ji1-Ixb6-U3pe0b48kvll"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idQ0GQw56M-sX1w-9J3O-rerF-aWGkFD384nlN",
                  "tag": "div",
                  "classes": [
                      "about-icon"
                  ],
                  "data": {},
                  "children": [
                      "idhIgyTdeg-Qyt2-09UE-2eVN-v0VRiVhcwqOw",
                      "idGUBwZi9o-HG4w-mZ5A-357B-Peocoj3nVabG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "ididkAzXSE-CIzj-KanR-FBTG-7DHVDDSPdGE9",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id5d1DyUGK-SNgc-RoFE-Oynz-NCrokzkZIvHG",
                  "tag": "img",
                  "classes": [
                      "about-icon-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709148645877-award_star.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idO2zV5YuF-VkS1-Krba-qVwv-aAe5sKrot78G",
                  "tag": "div",
                  "classes": [
                      "experience_img"
                  ],
                  "data": {},
                  "children": [
                      "id5d1DyUGK-SNgc-RoFE-Oynz-NCrokzkZIvHG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idFqz626c6-wdZH-l3ck-8Jjb-vi49m3i3PLvT",
                  "text": true,
                  "v": "Startup"
              },
              {
                  "_id": "idtNq5V52f-gMC0-dkVO-PQLy-aXtkGCo4kBjk",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFqz626c6-wdZH-l3ck-8Jjb-vi49m3i3PLvT"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idPyU18bro-7WWQ-LWUV-Ek9K-guU4qsXACRpY",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idPwZNySeL-y5z8-owxd-o0D0-DrVToi2lPI88",
                  "text": true,
                  "v": "2023/2024"
              },
              {
                  "_id": "idRU8c4jVS-uUSR-RJw3-DA5M-HcKZMM2KfXqA",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPwZNySeL-y5z8-owxd-o0D0-DrVToi2lPI88"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idIUKrwtBL-qaQT-ep5O-6vqN-5hLmDFHuQ7hL",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idtNq5V52f-gMC0-dkVO-PQLy-aXtkGCo4kBjk",
                      "idPyU18bro-7WWQ-LWUV-Ek9K-guU4qsXACRpY",
                      "idRU8c4jVS-uUSR-RJw3-DA5M-HcKZMM2KfXqA"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idi7k76U5X-YaV0-D8JT-6uRC-FvfwimvTSGvx",
                  "text": true,
                  "v": "Head of Design Team"
              },
              {
                  "_id": "idXihpNdfT-jMuG-kZn6-Degy-QmBMmY3NW4Pg",
                  "tag": "h3",
                  "classes": [
                      "company"
                  ],
                  "data": {},
                  "children": [
                      "idi7k76U5X-YaV0-D8JT-6uRC-FvfwimvTSGvx"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idp8qBV0U2-Fo7x-hCwF-Gg8s-8AM5Pp98AFGZ",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam\n                  gravida tempus. Pulvinar ut interdum quam nunc venenatis\n                  faucibus leo."
              },
              {
                  "_id": "idp7NTTfme-nxBi-YzbL-sAPU-pqfjZO3G5Z2I",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idp8qBV0U2-Fo7x-hCwF-Gg8s-8AM5Pp98AFGZ"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idJQaqWigB-3fkR-nT58-Hm3f-F3IKc5Krb67l",
                  "tag": "div",
                  "classes": [
                      "experience"
                  ],
                  "data": {},
                  "children": [
                      "idIUKrwtBL-qaQT-ep5O-6vqN-5hLmDFHuQ7hL",
                      "idXihpNdfT-jMuG-kZn6-Degy-QmBMmY3NW4Pg",
                      "idp7NTTfme-nxBi-YzbL-sAPU-pqfjZO3G5Z2I"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idqrPfPJaU-n2A5-ByGv-gBrM-7ySvtCG9GRli",
                  "tag": "div",
                  "classes": [
                      "about-icon"
                  ],
                  "data": {},
                  "children": [
                      "idO2zV5YuF-VkS1-Krba-qVwv-aAe5sKrot78G",
                      "idJQaqWigB-3fkR-nT58-Hm3f-F3IKc5Krb67l"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "ids84gfiUo-3SRL-iF5X-YQgU-anFWwsF2sP7L",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idcPmM0ehn-J7Vx-oFwA-C93M-yOmj8UcPcqe1",
                      "id6TL7pEGj-9xwt-kAE5-QrLm-7gk7hN10wUxf",
                      "idpgSpXCPD-kNoY-hY6P-iKTb-4Ec2FcvwET7b",
                      "idxebcI8tO-GYkI-h7pA-PxxT-rqDEb7ex4D73",
                      "idhafX1lbE-RH9z-Hui4-Mkix-jrowuWir3IeR",
                      "idQ0GQw56M-sX1w-9J3O-rerF-aWGkFD384nlN",
                      "ididkAzXSE-CIzj-KanR-FBTG-7DHVDDSPdGE9",
                      "idqrPfPJaU-n2A5-ByGv-gBrM-7ySvtCG9GRli"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idoON9Euu0-1JQQ-mFn1-Yyc5-ooLXDjjsJwhp",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ids84gfiUo-3SRL-iF5X-YQgU-anFWwsF2sP7L"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id3oVhXmlN-sVxX-f1IJ-ko1g-xlca3pCnbNC7",
                  "tag": "div",
                  "classes": [
                      "work-projects"
                  ],
                  "data": {},
                  "children": [
                      "idW3lNf400-NXXo-hEuE-yQrI-HO8y6XY0YYKN",
                      "idoON9Euu0-1JQQ-mFn1-Yyc5-ooLXDjjsJwhp"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id12BfBeNs-ztoD-s5OV-hhg8-Kf0ze8QIA9rW",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id3Bn8xUpf-Jljk-CkCd-Ehlv-iEHW2PRihm5x",
                  "text": true,
                  "v": "The core values that drive my work"
              },
              {
                  "_id": "idpNPn7kHZ-u0QC-OkbP-17q7-BOw6t9ilL1jB",
                  "tag": "h1",
                  "classes": [
                      "core-values"
                  ],
                  "data": {},
                  "children": [
                      "id3Bn8xUpf-Jljk-CkCd-Ehlv-iEHW2PRihm5x"
                  ],
                  "type": "Heading 1"
              },
              {
                  "_id": "idyq9uZSwV-Didb-Ml2B-oAy0-XyxNWVTUZa0d",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709150564821-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idgKi6Fi5F-X10P-eU5f-p2ty-Fv0cSeZOY1LZ",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idyq9uZSwV-Didb-Ml2B-oAy0-XyxNWVTUZa0d"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxe7DvZtZ-SP2A-2nmh-3MT0-H9IXxWwQyKKi",
                  "text": true,
                  "v": "Hardwork"
              },
              {
                  "_id": "idZbhIop7C-YQMf-2uwW-sFCm-wlkemhvRLPFz",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idxe7DvZtZ-SP2A-2nmh-3MT0-H9IXxWwQyKKi"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idOPEYnqjb-fuT5-os77-rk2Y-RTJziblI8r99",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "id8SgSNkbK-WK5D-VKWp-KuMy-CNPibUQvTCJ9",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idOPEYnqjb-fuT5-os77-rk2Y-RTJziblI8r99"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "ids6crS7nC-aM9g-7ykb-FwZs-gBqJl9iGKCvs",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idJA5W0Pvz-rYZ8-P9K7-YdMI-2OrnQeQZIMaY",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "idgKi6Fi5F-X10P-eU5f-p2ty-Fv0cSeZOY1LZ",
                      "idZbhIop7C-YQMf-2uwW-sFCm-wlkemhvRLPFz",
                      "id8SgSNkbK-WK5D-VKWp-KuMy-CNPibUQvTCJ9",
                      "ids6crS7nC-aM9g-7ykb-FwZs-gBqJl9iGKCvs"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id5ovTKIRD-eLMd-CpVM-Guqi-qL0Ez9nuKjOr",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709150997038-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idVryBYLgv-tfUg-Lyn0-mnRV-rFHHgzksu7JI",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "id5ovTKIRD-eLMd-CpVM-Guqi-qL0Ez9nuKjOr"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id6FgQCHP8-OvpO-7ywZ-OK0p-8Or2uNsoKUVB",
                  "text": true,
                  "v": "Resiilence"
              },
              {
                  "_id": "idb95yeApF-b10s-NASH-cFfi-hXA1rWCCf6Un",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "id6FgQCHP8-OvpO-7ywZ-OK0p-8Or2uNsoKUVB"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idIs7EMrZK-n09u-6ee6-1xqi-NceIB41wFwQs",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idCeCrkaH0-HVlO-8rya-L1sK-8k2gpC1qixV6",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idIs7EMrZK-n09u-6ee6-1xqi-NceIB41wFwQs"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idjIPVp1p0-75HX-hLKP-xls2-ewV3aiMQYzFj",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idL4zg288r-s26B-k8Sg-Ld4b-yAwjW6r44tdM",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "idVryBYLgv-tfUg-Lyn0-mnRV-rFHHgzksu7JI",
                      "idb95yeApF-b10s-NASH-cFfi-hXA1rWCCf6Un",
                      "idCeCrkaH0-HVlO-8rya-L1sK-8k2gpC1qixV6",
                      "idjIPVp1p0-75HX-hLKP-xls2-ewV3aiMQYzFj"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idlDOCbmAu-xQtP-0pC3-H6zy-xIDEjnN1wG8C",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709151228811-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idCLYoCgP9-M5BB-zlpI-2sl4-dcZKShIPbMg7",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idlDOCbmAu-xQtP-0pC3-H6zy-xIDEjnN1wG8C"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idZNvkNmd1-yMK3-KDyE-hUKI-vaw82cOPG7cm",
                  "text": true,
                  "v": "Integrity"
              },
              {
                  "_id": "id01J7Zkf7-ZR1S-Jrsc-X9qU-vaeuqeiNGXsz",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idZNvkNmd1-yMK3-KDyE-hUKI-vaw82cOPG7cm"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "ida5LKEOmr-dpKM-ipfW-lkCm-91Y0CXL3IOi0",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idoyU7Bctw-EvlJ-ptnv-8Ijc-WbBUX9oshVO5",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ida5LKEOmr-dpKM-ipfW-lkCm-91Y0CXL3IOi0"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idpCimakB5-2p2Q-Hsva-vyEe-6Uau7UBJlyjX",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idF6yAPIPS-RDoF-LPqN-QwWn-m5qmirdgFMDj",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "idCLYoCgP9-M5BB-zlpI-2sl4-dcZKShIPbMg7",
                      "id01J7Zkf7-ZR1S-Jrsc-X9qU-vaeuqeiNGXsz",
                      "idoyU7Bctw-EvlJ-ptnv-8Ijc-WbBUX9oshVO5",
                      "idpCimakB5-2p2Q-Hsva-vyEe-6Uau7UBJlyjX"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "ida07qnuOP-Li2G-BMyX-UeYQ-AGi7BWW8WYC9",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709152400787-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id2N57uX0S-h6bk-XjL6-4aag-mHNKXm2plkQE",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "ida07qnuOP-Li2G-BMyX-UeYQ-AGi7BWW8WYC9"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idVq9kfdJ0-9xg3-n3a1-uRwg-ZF0digV8i7l1",
                  "text": true,
                  "v": "Excellence"
              },
              {
                  "_id": "idY51Z8nOg-FlWM-oEZD-lQvW-XRMK9Ocme6jk",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idVq9kfdJ0-9xg3-n3a1-uRwg-ZF0digV8i7l1"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idoHrFSQlW-ijMU-qy5H-B2ZY-yVaSCOILJRQZ",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idY8nFkDqv-wbqm-M2g7-TpVr-OLtJ3UpuuQfx",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idoHrFSQlW-ijMU-qy5H-B2ZY-yVaSCOILJRQZ"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idTf6sGdU4-z6TO-Q9aj-mQL9-x6cqhoDYfJZP",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id0Bjau3uo-XrDY-Kbhf-zJBz-FSUuidMD0EMw",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "id2N57uX0S-h6bk-XjL6-4aag-mHNKXm2plkQE",
                      "idY51Z8nOg-FlWM-oEZD-lQvW-XRMK9Ocme6jk",
                      "idY8nFkDqv-wbqm-M2g7-TpVr-OLtJ3UpuuQfx",
                      "idTf6sGdU4-z6TO-Q9aj-mQL9-x6cqhoDYfJZP"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idlcp39Xw2-rfJg-OaGx-NI9o-8Lgzf0iKp7im",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709191066523-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idsTNpM1ne-Q1CQ-TjqW-vGfi-evPOgPgJdhhs",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idlcp39Xw2-rfJg-OaGx-NI9o-8Lgzf0iKp7im"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idpMs5Jc0f-V5km-gIkb-QeOc-XZgDXt854Po8",
                  "text": true,
                  "v": "Passion"
              },
              {
                  "_id": "idwgG9RKaG-uD1h-pU5U-Ycsj-8FDR34LNztwZ",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idpMs5Jc0f-V5km-gIkb-QeOc-XZgDXt854Po8"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idMmwm9S1e-5k3K-aL0X-5JXW-oPdzxXniBFym",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "id2AOku4W8-nazU-wsRU-ama0-Ky4A8L94qBid",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idMmwm9S1e-5k3K-aL0X-5JXW-oPdzxXniBFym"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idHRYXh4gJ-VTcy-dHbD-VN7b-8ju9KRPZo9NG",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idMxOYJJGA-CbrK-NOos-UdGs-ZaLgdu4OwYwd",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "idsTNpM1ne-Q1CQ-TjqW-vGfi-evPOgPgJdhhs",
                      "idwgG9RKaG-uD1h-pU5U-Ycsj-8FDR34LNztwZ",
                      "id2AOku4W8-nazU-wsRU-ama0-Ky4A8L94qBid",
                      "idHRYXh4gJ-VTcy-dHbD-VN7b-8ju9KRPZo9NG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idhwDVDHHQ-4fLC-0IaV-PzPH-1EHcCkgoO65Z",
                  "tag": "img",
                  "classes": [
                      "core-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709191145762-Featured%20icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idUlb8PekG-rB7e-qBGv-kwJp-rDmeu329Th8k",
                  "tag": "div",
                  "classes": [
                      "core_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idhwDVDHHQ-4fLC-0IaV-PzPH-1EHcCkgoO65Z"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idiVGWitpf-n29D-wXr9-lQEV-AZD20GsXs7uT",
                  "text": true,
                  "v": "Teamwork"
              },
              {
                  "_id": "idvJDl4RWF-mZ4r-wYJp-YUf6-db3b1owbCu4O",
                  "tag": "h4",
                  "classes": [
                      "core-heading"
                  ],
                  "data": {},
                  "children": [
                      "idiVGWitpf-n29D-wXr9-lQEV-AZD20GsXs7uT"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idhRqwu4M9-m6n8-m6PQ-pjrw-F6oS17li2jd0",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet consectetur. Arcu massa quam gravida\n              tempus. Pulvinar ut interdum quam nunc venenatis faucibus leo."
              },
              {
                  "_id": "idZXv2cX39-5qnx-HLhx-n5BQ-0F1Hg0c3bbxe",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idhRqwu4M9-m6n8-m6PQ-pjrw-F6oS17li2jd0"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idyCuFVpXt-FeDt-KUlF-6jRB-72BwGinDeMWY",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "id8JZkw6f8-7S3J-oQdB-VUHp-LAl3OmTVaBpq",
                  "tag": "div",
                  "classes": [
                      "core_item"
                  ],
                  "data": {},
                  "children": [
                      "idUlb8PekG-rB7e-qBGv-kwJp-rDmeu329Th8k",
                      "idvJDl4RWF-mZ4r-wYJp-YUf6-db3b1owbCu4O",
                      "idZXv2cX39-5qnx-HLhx-n5BQ-0F1Hg0c3bbxe",
                      "idyCuFVpXt-FeDt-KUlF-6jRB-72BwGinDeMWY"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iddjv7yglr-ePTg-ufZV-ntTh-hvX8Fp1XHZaW",
                  "tag": "div",
                  "classes": [
                      "core"
                  ],
                  "data": {},
                  "children": [
                      "idJA5W0Pvz-rYZ8-P9K7-YdMI-2OrnQeQZIMaY",
                      "idL4zg288r-s26B-k8Sg-Ld4b-yAwjW6r44tdM",
                      "idF6yAPIPS-RDoF-LPqN-QwWn-m5qmirdgFMDj",
                      "id0Bjau3uo-XrDY-Kbhf-zJBz-FSUuidMD0EMw",
                      "idMxOYJJGA-CbrK-NOos-UdGs-ZaLgdu4OwYwd",
                      "id8JZkw6f8-7S3J-oQdB-VUHp-LAl3OmTVaBpq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idq4VS8VY8-GGmd-KUhO-s6Oy-tSbGl9EU5Qeq",
                  "tag": "div",
                  "classes": [
                      "core_ctn"
                  ],
                  "data": {},
                  "children": [
                      "idpNPn7kHZ-u0QC-OkbP-17q7-BOw6t9ilL1jB",
                      "iddjv7yglr-ePTg-ufZV-ntTh-hvX8Fp1XHZaW"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idUbsc7xxO-ja8v-xGLT-S2FY-JWd98HSQLVn2",
                  "text": true,
                  "v": "Interested in working together?"
              },
              {
                  "_id": "ideAqx44mL-Fl3E-dhna-Cp4s-vW4vTU0rbtIr",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "iduluP55Sn-4bi2-88Tb-USCR-dDj7iSICBnxM",
                  "text": true,
                  "v": "Get in touch today."
              },
              {
                  "_id": "id7gczO3ou-73vi-7llX-SOx3-uEVMgs3OHYX7",
                  "tag": "h2",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idUbsc7xxO-ja8v-xGLT-S2FY-JWd98HSQLVn2",
                      "ideAqx44mL-Fl3E-dhna-Cp4s-vW4vTU0rbtIr",
                      "iduluP55Sn-4bi2-88Tb-USCR-dDj7iSICBnxM"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "id1lc0bDzx-lE0i-CM0e-XHwO-FCPjS2hkzfk0",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              },
              {
                  "_id": "id7dwlvtWV-IEMm-grDZ-DHNg-3u62Qh1FeU9X",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idFsI2X9lM-nf2R-dCaI-z3cF-c37hvRBDMkts",
                  "text": true,
                  "v": "eiusmod tempor incididunt ut labore et dolore magna aliqua."
              },
              {
                  "_id": "idH0CwobRV-zDzM-RUhi-Jxvz-IJCgfO3FPQZK",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id1lc0bDzx-lE0i-CM0e-XHwO-FCPjS2hkzfk0",
                      "id7dwlvtWV-IEMm-grDZ-DHNg-3u62Qh1FeU9X",
                      "idFsI2X9lM-nf2R-dCaI-z3cF-c37hvRBDMkts"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idZDp7qL9P-XoCN-QaI8-nszY-PAlmRWEgFDrK",
                  "tag": "div",
                  "classes": [
                      "working-page"
                  ],
                  "data": {},
                  "children": [
                      "id7gczO3ou-73vi-7llX-SOx3-uEVMgs3OHYX7",
                      "idH0CwobRV-zDzM-RUhi-Jxvz-IJCgfO3FPQZK"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1iAOgEE9-b2Xu-97hx-vC3J-WHBxZt1SmVf7",
                  "text": true,
                  "v": ">"
              },
              {
                  "_id": "idmFTc1bow-roj2-YkBp-DeK9-adcXGSCQpvYH",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id1iAOgEE9-b2Xu-97hx-vC3J-WHBxZt1SmVf7"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idLHx8LpiQ-7Esz-qmwn-upPY-P3lLFSvf5obG",
                  "tag": "div",
                  "classes": [
                      "next-button"
                  ],
                  "data": {},
                  "children": [
                      "idmFTc1bow-roj2-YkBp-DeK9-adcXGSCQpvYH"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idLYxycTos-nsLC-Ki7B-vWVQ-vBkncLK7pjhk",
                  "tag": "div",
                  "classes": [
                      "working-together"
                  ],
                  "data": {},
                  "children": [
                      "idZDp7qL9P-XoCN-QaI8-nszY-PAlmRWEgFDrK",
                      "idLHx8LpiQ-7Esz-qmwn-upPY-P3lLFSvf5obG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idHMl4uMZg-gSc3-zIWn-P4U3-qhUuQRui9994",
                  "text": true,
                  "v": "Follow me"
              },
              {
                  "_id": "id3bx9rlKu-vbzN-Of6G-HTQx-JfKrQdmH9T7m",
                  "tag": "h3",
                  "classes": [
                      "follow-me"
                  ],
                  "data": {},
                  "children": [
                      "idHMl4uMZg-gSc3-zIWn-P4U3-qhUuQRui9994"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idryO7Q5fV-dDi5-RQLv-ZbJ8-4wuXbgAboDRc",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709087810837-linkedin.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idr2W6uh01-0hoP-gQSJ-LRct-j5rZQOkGBkvb",
                  "text": true,
                  "v": "Linkedin"
              },
              {
                  "_id": "id69dPpxdK-U9ze-KUWB-HuMm-kHC3wE4CR1qA",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idr2W6uh01-0hoP-gQSJ-LRct-j5rZQOkGBkvb"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idVO8QPcB5-lqYz-YyaN-r298-W3K42ZAJDQc9",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idryO7Q5fV-dDi5-RQLv-ZbJ8-4wuXbgAboDRc",
                      "id69dPpxdK-U9ze-KUWB-HuMm-kHC3wE4CR1qA"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idGnaIxI7h-G2j1-hq0p-6JY5-sSlnEx1TiVLQ",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088090774-twitter.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idA4sbCXPD-BVme-hPit-C5nT-hCMYxaFyl9DX",
                  "text": true,
                  "v": "Twitter"
              },
              {
                  "_id": "idxYGTks3H-7Wvh-Fngy-Oko8-hg4LZyt1MyOc",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idA4sbCXPD-BVme-hPit-C5nT-hCMYxaFyl9DX"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idACeNAuXh-9Fv9-V9yF-I5Vi-iGvXYPFSZ2Ah",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idGnaIxI7h-G2j1-hq0p-6JY5-sSlnEx1TiVLQ",
                      "idxYGTks3H-7Wvh-Fngy-Oko8-hg4LZyt1MyOc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idr7ULKwi7-kdKz-n9LT-MCqB-Pgu1gRQLHaMH",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088195528-instagram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idADI9nGxH-eITG-TBxD-Tolr-pXHR8VdV1KgF",
                  "text": true,
                  "v": "Instagram"
              },
              {
                  "_id": "idMYZeRFvC-OiDp-kbpE-vFdw-iRA7dvG5SXju",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idADI9nGxH-eITG-TBxD-Tolr-pXHR8VdV1KgF"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idXYH1eGoQ-zwYP-l1xh-nzGc-bDBFDtPzYO6M",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idr7ULKwi7-kdKz-n9LT-MCqB-Pgu1gRQLHaMH",
                      "idMYZeRFvC-OiDp-kbpE-vFdw-iRA7dvG5SXju"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1U6FoFYO-gdkE-LZ97-AVyT-idXgVr9oeuQD",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idVO8QPcB5-lqYz-YyaN-r298-W3K42ZAJDQc9",
                      "idACeNAuXh-9Fv9-V9yF-I5Vi-iGvXYPFSZ2Ah",
                      "idXYH1eGoQ-zwYP-l1xh-nzGc-bDBFDtPzYO6M"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxMjrxRnR-jIoi-pyZ7-odMe-G0LRDGiTH5m6",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088362442-Facebook.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idhaD9iYbL-VZer-u2u4-WyCw-qmM11IrbyNOT",
                  "text": true,
                  "v": "Facebook"
              },
              {
                  "_id": "id0LSeewkn-sgOV-6Hti-J4vr-hidPxOeUKYyy",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idhaD9iYbL-VZer-u2u4-WyCw-qmM11IrbyNOT"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idTsvFoPix-3xBo-ymQY-kbCb-vMnBnw9Gth3l",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idxMjrxRnR-jIoi-pyZ7-odMe-G0LRDGiTH5m6",
                      "id0LSeewkn-sgOV-6Hti-J4vr-hidPxOeUKYyy"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idSQXTdEY7-09YY-TjJn-U0I3-DClHPjOe1dBz",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088546423-youtube.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idxhp1t87V-qyBJ-trJ5-eNkE-lTP9PMZT2NLO",
                  "text": true,
                  "v": "Youtube"
              },
              {
                  "_id": "idHcvNOHAS-bSzr-bg9o-wUqM-RUZkBwSXxaIP",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idxhp1t87V-qyBJ-trJ5-eNkE-lTP9PMZT2NLO"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idmFvFVnSX-8CGV-gBzI-C3AJ-dENAp5wl0RuB",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idSQXTdEY7-09YY-TjJn-U0I3-DClHPjOe1dBz",
                      "idHcvNOHAS-bSzr-bg9o-wUqM-RUZkBwSXxaIP"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idR9MJ3gdf-6Rml-881H-sSic-EPgRVcmhyWR3",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088617221-dribbble.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idF81dRAjg-1sUo-aByK-RiuZ-8KqAJWQXz2Z1",
                  "text": true,
                  "v": "Dribble"
              },
              {
                  "_id": "idy6sKoiPh-RHkI-p1RJ-lcYn-n8ekfYySAYbq",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idF81dRAjg-1sUo-aByK-RiuZ-8KqAJWQXz2Z1"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id2jwHfB9Y-g9OT-QA6n-Ex30-HGbl01aSSF2G",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idR9MJ3gdf-6Rml-881H-sSic-EPgRVcmhyWR3",
                      "idy6sKoiPh-RHkI-p1RJ-lcYn-n8ekfYySAYbq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idckXScFKs-5p40-Ev1o-mjkP-YeyXtI0KO2H0",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idTsvFoPix-3xBo-ymQY-kbCb-vMnBnw9Gth3l",
                      "idmFvFVnSX-8CGV-gBzI-C3AJ-dENAp5wl0RuB",
                      "id2jwHfB9Y-g9OT-QA6n-Ex30-HGbl01aSSF2G"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxPGB3Yky-Jci9-HY2D-Jcd3-qBgeQY5wNxu4",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089122414-telegram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idd5kheX8y-Hvla-2SGd-QHn9-djRvRwaGC4cT",
                  "text": true,
                  "v": "Telegram"
              },
              {
                  "_id": "id3VXP9Vjr-DoQG-kXNC-Zdha-nLK0VIqUpRWK",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idd5kheX8y-Hvla-2SGd-QHn9-djRvRwaGC4cT"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idcCrirWtJ-Y40B-wFvJ-CBLe-N5YOlF1NS0iF",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idxPGB3Yky-Jci9-HY2D-Jcd3-qBgeQY5wNxu4",
                      "id3VXP9Vjr-DoQG-kXNC-Zdha-nLK0VIqUpRWK"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id25H94OUX-lx6z-L5m2-lw9l-mF0kNk6eH4JC",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089177123-whatsapp.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idG5VbXBF2-vDCZ-qPec-aBDK-889qVMmNqC1W",
                  "text": true,
                  "v": "Whatsapp"
              },
              {
                  "_id": "idzMmMOB3X-hknW-aCTw-2NyI-Hm6f3SWUKB1m",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idG5VbXBF2-vDCZ-qPec-aBDK-889qVMmNqC1W"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idmNolZTTB-IDzg-DbDr-F0W7-PPuvzmdUNSXh",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "id25H94OUX-lx6z-L5m2-lw9l-mF0kNk6eH4JC",
                      "idzMmMOB3X-hknW-aCTw-2NyI-Hm6f3SWUKB1m"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idbgAInOcc-607C-yl2Y-TiWz-BlW97tQjJdhM",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089232947-behance.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idNrdWGTVV-LmHh-Cd40-mN58-Oi46EJOFNNSn",
                  "text": true,
                  "v": "Behance"
              },
              {
                  "_id": "idmxwA3Un3-RFQw-GKeX-KcWm-eyPYq0XZps6u",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNrdWGTVV-LmHh-Cd40-mN58-Oi46EJOFNNSn"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idIRDzYK9P-u3P0-9cMR-TBGw-8FSLUEQYbEWv",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idbgAInOcc-607C-yl2Y-TiWz-BlW97tQjJdhM",
                      "idmxwA3Un3-RFQw-GKeX-KcWm-eyPYq0XZps6u"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iduodkVOck-Muzs-Y4xz-21K3-8f90tQNKgH3W",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idcCrirWtJ-Y40B-wFvJ-CBLe-N5YOlF1NS0iF",
                      "idmNolZTTB-IDzg-DbDr-F0W7-PPuvzmdUNSXh",
                      "idIRDzYK9P-u3P0-9cMR-TBGw-8FSLUEQYbEWv"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idLWA2m0yZ-ms8T-O1WR-t2Cz-WUcdMcoOhaXz",
                  "tag": "div",
                  "classes": [
                      "follow"
                  ],
                  "data": {},
                  "children": [
                      "id3bx9rlKu-vbzN-Of6G-HTQx-JfKrQdmH9T7m",
                      "id1U6FoFYO-gdkE-LZ97-AVyT-idXgVr9oeuQD",
                      "idckXScFKs-5p40-Ev1o-mjkP-YeyXtI0KO2H0",
                      "iduodkVOck-Muzs-Y4xz-21K3-8f90tQNKgH3W"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idL2m4kkU7-KMiE-O17L-6NcI-8Cuy3qXNYiL9",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idLWA2m0yZ-ms8T-O1WR-t2Cz-WUcdMcoOhaXz"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idni5NiJYZ-L5LM-l4Pb-UE7w-mBnyP98UFnOp",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "iduZhUfojL-nowX-6R47-J9aP-dRWcFsFOOThm",
                  "tag": "h3",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {},
                  "children": [
                      "idni5NiJYZ-L5LM-l4Pb-UE7w-mBnyP98UFnOp"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id0SmNWNwL-rmS7-pMoh-DrBW-exdtww8S7iGP",
                  "text": true,
                  "v": "I'm Akin Matthews, a designer passionate about creating"
              },
              {
                  "_id": "idEMa36F4c-l9lL-Brkk-WTO4-GeWdao5pMhm8",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idWLb0YRET-Yfg2-FjDA-K9E3-8N7QiJHaRqg0",
                  "text": true,
                  "v": "beautiful, usable and accessible designs for individuals."
              },
              {
                  "_id": "idoDDLVhtc-dHqu-pLbD-9i9Q-CyTOERS2HI0f",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id0SmNWNwL-rmS7-pMoh-DrBW-exdtww8S7iGP",
                      "idEMa36F4c-l9lL-Brkk-WTO4-GeWdao5pMhm8",
                      "idWLb0YRET-Yfg2-FjDA-K9E3-8N7QiJHaRqg0"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idmVxIy8eE-P8HB-HkKV-tGcv-R7FmALsbx7qa",
                  "tag": "div",
                  "classes": [
                      "footer-up"
                  ],
                  "data": {},
                  "children": [
                      "iduZhUfojL-nowX-6R47-J9aP-dRWcFsFOOThm",
                      "idoDDLVhtc-dHqu-pLbD-9i9Q-CyTOERS2HI0f"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idkpHxMUmS-L9bJ-6qJs-JbIm-U49iW7vr1sym",
                  "text": true,
                  "v": "Product"
              },
              {
                  "_id": "idVeDo4lW0-slM7-KxMb-b1Hs-LQHaY9vaVsfF",
                  "tag": "h4",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idkpHxMUmS-L9bJ-6qJs-JbIm-U49iW7vr1sym"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idPkssuIvd-GMLi-9qJf-kw5R-Us3UMB7Bad4k",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idMhItrT2X-xncD-I0VA-P2Ft-qh5x46odRLEW",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPkssuIvd-GMLi-9qJf-kw5R-Us3UMB7Bad4k"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idU5ts3w2i-Atac-zZyr-FiTI-HZ5PovjvBR0t",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "id8B12VwKN-YKnZ-9ujf-dDUU-xtfu72qWoetk",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idU5ts3w2i-Atac-zZyr-FiTI-HZ5PovjvBR0t"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idmDsrKrRd-zCyw-UGlX-V2DS-yAVM56OOK21S",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idXcmhyXDt-Rbp4-RTpU-2BMI-ZOAbBevjYYzn",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idmDsrKrRd-zCyw-UGlX-V2DS-yAVM56OOK21S"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idI0PeGNqf-IzHn-uGfH-1wGR-18PaZHIxLYr2",
                  "tag": "div",
                  "classes": [
                      "footer-down"
                  ],
                  "data": {},
                  "children": [
                      "idVeDo4lW0-slM7-KxMb-b1Hs-LQHaY9vaVsfF",
                      "idMhItrT2X-xncD-I0VA-P2Ft-qh5x46odRLEW",
                      "id8B12VwKN-YKnZ-9ujf-dDUU-xtfu72qWoetk",
                      "idXcmhyXDt-Rbp4-RTpU-2BMI-ZOAbBevjYYzn"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idPvg2okrW-Spj4-cjkf-rHBG-Ea9GelGwMiSw",
                  "tag": "div",
                  "classes": [
                      "footer"
                  ],
                  "data": {},
                  "children": [
                      "idmVxIy8eE-P8HB-HkKV-tGcv-R7FmALsbx7qa",
                      "idI0PeGNqf-IzHn-uGfH-1wGR-18PaZHIxLYr2"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id2dfVogZe-E2np-H94F-VSqD-ZyhX3p7oTwsy",
                  "text": true,
                  "v": "Copyright © Tailorflow"
              },
              {
                  "_id": "idtly4Aov9-2Nfo-Sm3Z-TQhc-cXW6OpyZfryy",
                  "tag": "p",
                  "classes": [
                      "copy-right"
                  ],
                  "data": {},
                  "children": [
                      "id2dfVogZe-E2np-H94F-VSqD-ZyhX3p7oTwsy"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idCgze50ui-ZYG0-4J3x-zdGP-xHcSxwa1WD0c",
                  "tag": "footer",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPvg2okrW-Spj4-cjkf-rHBG-Ea9GelGwMiSw",
                      "idtly4Aov9-2Nfo-Sm3Z-TQhc-cXW6OpyZfryy"
                  ],
                  "type": "Footer-section"
              }
          ],
            "styles":{
              "data": {
                  "appliedStylesMap": {},
                  "breakpoints": {
                  }, 
                  "macros": [], "migrations": {"stylesNext": true}, "swatches": []
              },
              "style":[
                  {
                      "style_id": "42c31650-6d87-4731-9fec-dcc3557898af",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "*, ::before, ::after",
                          "sel": "*, ::before, ::after",
                          "styleLess": "box-sizing: border-box;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "47d575cd-253a-4108-964b-250dc0240d7e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "html, body",
                          "sel": "html, body",
                          "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1300px; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "8c744bac-779c-4105-9984-78b43a3330d2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "body",
                          "sel": "body",
                          "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": "body",
                                  "styleLess": "font-family: inter; width: 90%;"
                              },
                              "medium": {
                                  "sel": "body",
                                  "styleLess": "width: 95%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "556c0c96-f2a8-4ff5-98c0-1f09c90f66f7",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "img",
                          "sel": "img",
                          "styleLess": "display: block;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "20ba0ee6-b237-439c-8d85-610abc7e056a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "ul",
                          "sel": "ul",
                          "styleLess": "list-style: none; padding: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "71acb0ee-c873-409f-bc0c-a53c640e2db0",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "a",
                          "sel": "a",
                          "styleLess": "text-decoration: none; color: black;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "0fbc643b-6569-40d8-8309-d739cd3e0975",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "p, h1, h2, h3, h4, h5, h6",
                          "sel": "p, h1, h2, h3, h4, h5, h6",
                          "styleLess": "overflow-wrap: break-word; margin: 0px; line-height: 1.5em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4d0c1d12-2f54-46d5-82c2-621e16513bed",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "#aboutmain",
                          "sel": "#aboutmain",
                          "styleLess": "padding: 2em 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "47ea64a8-188c-4372-a43f-6ad7a84473d8",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "h1",
                          "sel": "h1",
                          "styleLess": "font-size: 2.2em; font-weight: 600; margin-bottom: 0.3em;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": "h1",
                                  "styleLess": "font-size: 27px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "61f4e409-c547-458a-a91f-24f53d7fe21e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "hr",
                          "sel": "hr",
                          "styleLess": "margin: 1.5em 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "f5adb7f0-e41d-41a4-bc6c-65c3f323ce04",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header",
                          "styleLess": "display: flex; justify-content: space-between; align-items: center;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "3a7ffccc-b01d-4911-bbf9-176041791ae9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".menu-icon",
                          "styleLess": "width: 40px; height: 40px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "c4f1b58d-47a0-4ee6-9ab9-23a54f442927",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".tailorflow",
                          "styleLess": "text-decoration: none; font-weight: 600; font-size: 25px; color: rgb(0, 52, 53);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "ca4104d5-833d-4761-8b2c-432974c0aa8b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header-list",
                          "styleLess": "display: none;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".header-list",
                                  "styleLess": "display: flex; gap: 1em; width: 20%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "c35b4e58-159e-41b1-aaf2-44e8bf30d2b3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".banner_img",
                          "styleLess": "width: 95%; padding: 0px; margin: 2em auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "c00e9fa6-ca96-4674-adb8-ff5bba478bac",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".designer-image",
                          "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".designer-image",
                                  "styleLess": "width: 680px; height: 650px;"
                              },
                              "medium": {
                                  "sel": ".designer-image",
                                  "styleLess": "width: 400px; height: 500px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "0d3d474e-284f-40be-96ff-5d578723fed3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".about_img-ctn",
                          "styleLess": "width: 95%; padding: 0px; margin: 2em auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "324b350d-9bf3-46f9-bb9a-127e04a20d4d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".about-note",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".about-note",
                                  "styleLess": "padding-top: 40px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "068e0fd6-26ed-49c0-bec0-cb2dbca4794e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow",
                          "styleLess": "display: flex; gap: 1em; align-items: center; width: 200px; font-size: 1.1em; margin-bottom: 50px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "9f8cab4b-5ee1-486d-b267-8065e83b895a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow-image",
                          "styleLess": "width: 20px; height: 20px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "30ea6d4f-e1d1-4687-bb91-a4af3f1982ae",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".works",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "05bda6b6-cb7d-42ab-b506-184a629f4d8e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "h2",
                          "sel": "h2",
                          "styleLess": "font-size: 25px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "12a1dbfa-3a03-4c72-b281-d16e4b5073cb",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".about-icon",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; padding-top: 20px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "f971b5a4-464a-452e-a543-b20baa3e1e1c",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".experience_img",
                          "styleLess": "width: 80px; height: 80px; padding: 0px; overflow: hidden;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "f594c708-80ca-41f5-ad94-e21e97c285e5",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".about-icon-image",
                          "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "b98adf6b-926b-4581-ba64-3821ee6f945e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".experience",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "32763bef-9772-4cfc-b173-9c336ee04895",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".linestyle",
                          "styleLess": "display: flex; align-items: center; gap: 0.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "221dc365-9a21-455e-8431-ab77f98fcbcd",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".lineheight",
                          "styleLess": "width: 25px; height: 1px; margin: auto 0px; background-color: rgb(152, 162, 179);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "784b91aa-c068-4239-98de-bd7b7ba2a724",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".experience > h3",
                          "styleLess": "font-size: 1.6em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "32b1c859-92ac-4806-85ac-4a1d58f8b960",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".core",
                          "styleLess": "display: flex; flex-direction: column; margin: 1em 0px;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".core",
                                  "styleLess": "flex-flow: wrap; justify-content: space-between;"
                              },
                              "medium": {
                                  "sel": ".core",
                                  "styleLess": "display: flex; padding: 20px; gap: 30px; text-align: justify;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "c9cd39c3-ccd9-487c-8056-7eda4a808ca8",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".core > div",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "6ea2821e-a5d7-47f5-8da4-0d8f8d448418",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".next-button",
                          "styleLess": "width: 80px; height: 80px; border-radius: 100px; border: 1px solid rgb(102, 112, 133); padding: 15px; display: flex; align-self: flex-end; justify-content: center; font-size: 1.5em; color: rgb(102, 112, 133);",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".next-button",
                                  "styleLess": "margin-left: 450px; margin-bottom: 2em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "ed78d763-4bc0-418f-a851-0eb031be5daf",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".working-together",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.5em;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".working-together",
                                  "styleLess": "gap: 100px; display: flex; justify-content: space-between; padding: 50px 30px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "5d3fc0ab-63fc-4a86-a590-c160ca6af908",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".working-page",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "6e779143-2f5b-4cd5-bd25-288988290919",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em; margin-bottom: 2em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "484b0fc2-2d44-4abd-9573-f208a0168e39",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow-me",
                          "styleLess": "font-size: 1.5em; letter-spacing: 0.05em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "388e34fe-22fc-4446-8fbd-92fffc6c6d8f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".icon-list",
                          "styleLess": "display: flex; align-items: center; gap: 0.5em; margin-bottom: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4c725a83-cff6-49c2-9c35-640e15be02b9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "288a20c6-2f94-40da-bf67-4209b4f32cfd",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer-up, .footer-down",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; font-size: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "10b33836-bc41-4cb0-8b59-d9401a791d7d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".copy-right",
                          "styleLess": "margin-top: 1.5em; font-size: 0.9em; color: rgb(52, 64, 84);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "aeccb3ab-5c88-4083-9a78-66b3a0dc0101",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".about-image",
                          "sel": ".about-image",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".about-image",
                                  "styleLess": "width: 675px; height: 300px; padding-right: 50px;"
                              },
                              "medium": {
                                  "sel": ".about-image",
                                  "styleLess": "width: 500px; height: 500px; padding-right: 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "bbe36bd4-93ec-4cb1-8ab7-56f6522c9183",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".core-values",
                          "sel": ".core-values",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".core-values",
                                  "styleLess": "margin: auto;"
                              },
                              "medium": {
                                  "sel": ".core-values",
                                  "styleLess": "padding-top: 50px; font-size: 30px; font-weight: 600; text-align: center;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "2aa76f4c-371e-4860-be94-c945e9c928aa",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".core_item",
                          "sel": ".core_item",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".core_item",
                                  "styleLess": "width: 45%;"
                              },
                              "medium": {
                                  "sel": ".core_item",
                                  "styleLess": "width: 30%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "758bd7db-0ef9-4914-96b6-018c76835f48",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".follow, .footer",
                          "sel": ".follow, .footer",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow, .footer",
                                  "styleLess": "display: flex; flex-direction: row; align-items: center; justify-content: space-between;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "ca604f74-48b5-4e90-84bf-c91b672ef444",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".footer-down",
                          "sel": ".footer-down",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".footer-down",
                                  "styleLess": "width: 40%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "7c125751-81e6-482d-8302-1e2f4fbebaf2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".header-icons",
                          "sel": ".header-icons",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "e595b7a4-b5d4-46a8-a0d3-6c75cdbd58f9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "li",
                          "sel": "li",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "4c9b5387-7909-4a59-ad50-af9b97e98852",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".designer",
                          "sel": ".designer",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".designer",
                                  "styleLess": "display: flex; gap: 50px; padding: 50px; background-color: rgb(252, 252, 253); margin-bottom: 30px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "c63ca78e-dd69-4401-b07e-7624c153868e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".designer-note",
                          "sel": ".designer-note",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".designer-note",
                                  "styleLess": "padding-top: 100px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "98a68f4f-7107-47fd-b258-cad610d136c9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".about",
                          "sel": ".about",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".about",
                                  "styleLess": "display: flex; gap: 63px; padding: 30px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "78201173-b314-46d8-9351-ddb7100d8516",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".work-projects",
                          "sel": ".work-projects",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".work-projects",
                                  "styleLess": "display: flex; margin-top: 50px; gap: 102px; padding: 24px 64px 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "114d153d-dd90-4ac7-98e3-7e1ed7daf72f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".core-heading",
                          "sel": ".core-heading",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".core-heading",
                                  "styleLess": "margin: 2px; font-size: 22px; font-weight: 700;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "8a3d829a-2529-4fa0-b537-24a4ba562d71",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".core-image",
                          "sel": ".core-image",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".core-image",
                                  "styleLess": "width: 45px; height: 45px;"
                              }
                          }
                      }
                  }
              ]
            },
        },
        {
            "route":"/portfolioDetails.html",
            "name":" Details page",
            "head":{
                "title":"Portfolio details",
                "description":"This is the portfolio page",
            },
            "slug":"gVGW-vQL7-Ye87JFZkhgDgFA",           
            "page id": "idiqMD5pSL-t4HF-BLd6-9Jrq-e5vM3WWtdobn",
            "nodes":[
              {
                  "_id": "idfeMEsmum-A8T8-98GU-rNi6-zxA4z1Zngo8V",
                  "tag": "main",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ido0Tp0nSa-08AU-KKBE-DdeX-44WSwUb6DgsQ",
                      "idfwVcaGvr-smme-7XsQ-jYgy-gPhbvggWk4qb",
                      "id6ZNi5Cpu-Y2Hc-nTeX-dMqh-WANOzLbYRXNg",
                      "idsJsD5YIf-cX3L-AN5B-NCEu-yahFuuLqFzuH",
                      "idjinGytWi-AeET-9EDc-qpxK-70D10WQxroZI"
                  ],
                  "type": "Main"
              },
              {
                  "_id": "id8mW06EW3-bee1-1BFq-8FNy-U5bQOsFIjqfe",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idAjhxca49-yk8Q-Tj5G-1OP6-QDlJIIoq4EDY",
                  "tag": "a",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {
                      "href": "./index.html"
                  },
                  "children": [
                      "id8mW06EW3-bee1-1BFq-8FNy-U5bQOsFIjqfe"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idMmeTp275-JlFS-OmK3-INpv-L3lClTXSv7qD",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idAjhxca49-yk8Q-Tj5G-1OP6-QDlJIIoq4EDY"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idBslRQEOE-cjad-PJ7c-hcmZ-c7UyiAUhOIGk",
                  "tag": "ul",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idMmeTp275-JlFS-OmK3-INpv-L3lClTXSv7qD"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "idiZDJVvID-dFOi-ukbO-6GMf-ts7KaHCvsxOr",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "id2Skvy9XS-hSpB-Q5Rd-M0vA-jGMs79xeR34e",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./about.html"
                  },
                  "children": [
                      "idiZDJVvID-dFOi-ukbO-6GMf-ts7KaHCvsxOr"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idV9ZbFlk4-6zSH-SJ8e-gT4F-9oOnMjsetpgv",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id2Skvy9XS-hSpB-Q5Rd-M0vA-jGMs79xeR34e"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idGV6OrBAS-lgWq-UGIp-ocup-3Zdfoe93IB82",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idhjhi0fUK-xlgF-ntlF-nVod-MK5jaZaMJLZQ",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./portfolioDetails.html"
                  },
                  "children": [
                      "idGV6OrBAS-lgWq-UGIp-ocup-3Zdfoe93IB82"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idZXHoV5UH-Nt3p-TV6g-XBVb-9CbR6vlTrjtB",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idhjhi0fUK-xlgF-ntlF-nVod-MK5jaZaMJLZQ"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idk2Pok6FL-w0AY-YLAX-bE6b-lxoPkmv28uNh",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idZFW4kgi6-6FJd-ml16-1xyU-BtHaYhfmVwoV",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./contact.html"
                  },
                  "children": [
                      "idk2Pok6FL-w0AY-YLAX-bE6b-lxoPkmv28uNh"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "id8TLoERBT-uBvK-mzrZ-U18n-ypmCls9nYP9a",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idZFW4kgi6-6FJd-ml16-1xyU-BtHaYhfmVwoV"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idp9cSf55z-h01c-Z9Rv-kiNV-66FKIx0U1qNH",
                  "tag": "ul",
                  "classes": [
                      "header",
                      "header-list"
                  ],
                  "data": {},
                  "children": [
                      "idV9ZbFlk4-6zSH-SJ8e-gT4F-9oOnMjsetpgv",
                      "idZXHoV5UH-Nt3p-TV6g-XBVb-9CbR6vlTrjtB",
                      "id8TLoERBT-uBvK-mzrZ-U18n-ypmCls9nYP9a"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "id66FnxiIZ-GmAw-bThz-Mb9E-a9lCLYBh9cxa",
                  "tag": "img",
                  "classes": [
                      "menu-icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idPWizr2co-k7pa-kKqN-YdD9-bGJv2z5fUvwL",
                  "tag": "nav",
                  "classes": [
                      "header"
                  ],
                  "data": {},
                  "children": [
                      "idBslRQEOE-cjad-PJ7c-hcmZ-c7UyiAUhOIGk",
                      "idp9cSf55z-h01c-Z9Rv-kiNV-66FKIx0U1qNH",
                      "id66FnxiIZ-GmAw-bThz-Mb9E-a9lCLYBh9cxa"
                  ],
                  "type": "Navigation"
              },
              {
                  "_id": "ido0Tp0nSa-08AU-KKBE-DdeX-44WSwUb6DgsQ",
                  "tag": "header",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPWizr2co-k7pa-kKqN-YdD9-bGJv2z5fUvwL"
                  ],
                  "type": "Header"
              },
              {
                  "_id": "idEmMfV7Ct-2B6c-IG9g-kI4g-A59M78ZDbdh4",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idIRM3ZLOP-ZC6H-cF7r-Cr2Z-zatnWBxuBlLX",
                  "tag": "h2",
                  "classes": [
                      "heading-one"
                  ],
                  "data": {},
                  "children": [
                      "idEmMfV7Ct-2B6c-IG9g-kI4g-A59M78ZDbdh4"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idMwsPNXZD-Kp7e-SoM5-SXk2-d7Ue9AxdtCVt",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n            eiusmod tempor incididunt ut labore et dolore magna aliqua"
              },
              {
                  "_id": "idWQm5NsH4-4MQH-RtdD-wixs-pN3L1IAP2Ukq",
                  "tag": "p",
                  "classes": [
                      "portfolio"
                  ],
                  "data": {},
                  "children": [
                      "idMwsPNXZD-Kp7e-SoM5-SXk2-d7Ue9AxdtCVt"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idEqcPM5N7-VVHM-kfOx-CrEz-oIH9RXiESC4y",
                  "tag": "div",
                  "classes": [
                      "hero_top"
                  ],
                  "data": {},
                  "children": [
                      "idIRM3ZLOP-ZC6H-cF7r-Cr2Z-zatnWBxuBlLX",
                      "idWQm5NsH4-4MQH-RtdD-wixs-pN3L1IAP2Ukq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idaE1HmgUz-rG9Y-IQNm-ichC-9fschBzHI7jN",
                  "text": true,
                  "v": "All projects"
              },
              {
                  "_id": "idokk7k0eC-erMI-C24R-ykkM-sF7ZW2JFKUuG",
                  "tag": "p",
                  "classes": [
                      "projects"
                  ],
                  "data": {},
                  "children": [
                      "idaE1HmgUz-rG9Y-IQNm-ichC-9fschBzHI7jN"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idBZdOcjhS-mP1Y-h696-9BzL-7ZLSmVkmcBX6",
                  "text": true,
                  "v": "UI/UX"
              },
              {
                  "_id": "idcljBx0Qf-IUgn-RxoI-z0Vq-33ZSPCmmHADl",
                  "tag": "p",
                  "classes": [
                      "uiux"
                  ],
                  "data": {},
                  "children": [
                      "idBZdOcjhS-mP1Y-h696-9BzL-7ZLSmVkmcBX6"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idA4KK4fFT-mWaO-5s6R-kqbO-hRbMh3Dif03B",
                  "text": true,
                  "v": "Branding"
              },
              {
                  "_id": "idfvstrCdw-OlWO-jmzz-1RHG-LnFDE27AP2NC",
                  "tag": "p",
                  "classes": [
                      "branding"
                  ],
                  "data": {},
                  "children": [
                      "idA4KK4fFT-mWaO-5s6R-kqbO-hRbMh3Dif03B"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idlp0PNYTD-IGSv-1dhn-2hnS-gGdB42tzmNu8",
                  "text": true,
                  "v": "Industrial"
              },
              {
                  "_id": "idGsYmyHzG-RKAK-9eaq-83Fg-Y7VCatKuQv6D",
                  "tag": "p",
                  "classes": [
                      "industrial"
                  ],
                  "data": {},
                  "children": [
                      "idlp0PNYTD-IGSv-1dhn-2hnS-gGdB42tzmNu8"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idNK7RkYKU-4HZq-eYu2-hJiY-Yl77i1zejLYp",
                  "tag": "div",
                  "classes": [
                      "hero_bottom",
                      "buttons"
                  ],
                  "data": {},
                  "children": [
                      "idokk7k0eC-erMI-C24R-ykkM-sF7ZW2JFKUuG",
                      "idcljBx0Qf-IUgn-RxoI-z0Vq-33ZSPCmmHADl",
                      "idfvstrCdw-OlWO-jmzz-1RHG-LnFDE27AP2NC",
                      "idGsYmyHzG-RKAK-9eaq-83Fg-Y7VCatKuQv6D"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idfwVcaGvr-smme-7XsQ-jYgy-gPhbvggWk4qb",
                  "tag": "div",
                  "classes": [
                      "hero"
                  ],
                  "data": {},
                  "children": [
                      "idEqcPM5N7-VVHM-kfOx-CrEz-oIH9RXiESC4y",
                      "idNK7RkYKU-4HZq-eYu2-hJiY-Yl77i1zejLYp"
                  ],
                  "type": "Hero Section"
              },
              {
                  "_id": "idHLwFWF3C-CuFQ-OwII-RPe1-XCsiisIzbION",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709051483529-Rectangle%20518.png",
                      "alt": "view1"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id3UL7kYid-6L2I-BNlE-OQU0-Bo21eWvCtjxw",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idHLwFWF3C-CuFQ-OwII-RPe1-XCsiisIzbION"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id8ayJnRE7-FOLu-JmTW-nRcB-dvlyAQgrLHU5",
                  "text": true,
                  "v": "Deshko"
              },
              {
                  "_id": "idghuzPNfZ-yC5y-FKrB-fvSP-URcC79r2m25A",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id8ayJnRE7-FOLu-JmTW-nRcB-dvlyAQgrLHU5"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idIAE6mG7E-T0Ob-YRqA-Zw60-Gj7WnpYDu5sS",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idanIYZEFt-pRqb-rmAm-ZfBz-bZWUze1wRo8Z",
                  "text": true,
                  "v": "Industrial"
              },
              {
                  "_id": "id9NGN5sY7-z6Kb-dk9d-PhXV-1WOGGOpw99fQ",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idanIYZEFt-pRqb-rmAm-ZfBz-bZWUze1wRo8Z"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idTo4tPy4T-nCO9-bfld-4oK8-0QvgmtiNOwm2",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idghuzPNfZ-yC5y-FKrB-fvSP-URcC79r2m25A",
                      "idIAE6mG7E-T0Ob-YRqA-Zw60-Gj7WnpYDu5sS",
                      "id9NGN5sY7-z6Kb-dk9d-PhXV-1WOGGOpw99fQ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idX3fPKAsI-Nz4e-wBhf-RqbD-sFHhYaIjWGJd",
                  "text": true,
                  "v": "Sofa furniture design doe Deshko"
              },
              {
                  "_id": "idxajj35Z7-TBge-Sx44-Cf6u-AQLQDphK0vfG",
                  "tag": "h3",
                  "classes": [
                      "portfolio-note"
                  ],
                  "data": {},
                  "children": [
                      "idX3fPKAsI-Nz4e-wBhf-RqbD-sFHhYaIjWGJd"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idWbn3N28I-NEWP-Eydy-tYDD-SeCE1k3rxABB",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idTo4tPy4T-nCO9-bfld-4oK8-0QvgmtiNOwm2",
                      "idxajj35Z7-TBge-Sx44-Cf6u-AQLQDphK0vfG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idZ75Lk6lY-AqHZ-CrB8-sHEX-dtlNCM2EOp0V",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "id3UL7kYid-6L2I-BNlE-OQU0-Bo21eWvCtjxw",
                      "idWbn3N28I-NEWP-Eydy-tYDD-SeCE1k3rxABB"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idoZFi1Yzh-Lk3G-bvBW-L20F-EMRBLPxlSOkB",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709052506256-Industrial (1).png",
                      "alt": "view2"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idmt55Kl8g-kWHv-3d0h-FcwJ-NQv1aFg3tnAq",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idoZFi1Yzh-Lk3G-bvBW-L20F-EMRBLPxlSOkB"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idYBg5aES4-LkeF-sAI3-fmJg-A07QYwawsY3b",
                  "text": true,
                  "v": "Beazy"
              },
              {
                  "_id": "id47zLeI5R-Zlfb-3QDw-FmKC-HbvfgznVH0ON",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idYBg5aES4-LkeF-sAI3-fmJg-A07QYwawsY3b"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idE81Fhutx-Yblf-L8lj-FXDr-HVYoH6anm83w",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idCB7qU7k2-qCPv-vJOG-xU3y-3pJm2SZAloSs",
                  "text": true,
                  "v": "Industrial"
              },
              {
                  "_id": "idpMITwUHA-5v8v-Dw9T-DBwI-7gmIHJ0Xwvxl",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idCB7qU7k2-qCPv-vJOG-xU3y-3pJm2SZAloSs"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idKPnKdXZt-EAg3-tbvt-grWD-vhai8l7l6uFB",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "id47zLeI5R-Zlfb-3QDw-FmKC-HbvfgznVH0ON",
                      "idE81Fhutx-Yblf-L8lj-FXDr-HVYoH6anm83w",
                      "idpMITwUHA-5v8v-Dw9T-DBwI-7gmIHJ0Xwvxl"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "ida7UDT8Ln-2Jo2-sHjN-VuDH-jgqo0PIKIEGr",
                  "text": true,
                  "v": "Beazy showroom interior design & decoration"
              },
              {
                  "_id": "id7Utp4EJD-i0Hm-KaoA-I5PY-jPJmm2jFwPuc",
                  "tag": "h3",
                  "classes": [],
                  "data": {},
                  "children": [
                      "ida7UDT8Ln-2Jo2-sHjN-VuDH-jgqo0PIKIEGr"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "id9JetdXL1-s4PJ-VyuO-Ctc0-fXTiQkfa5hbn",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idKPnKdXZt-EAg3-tbvt-grWD-vhai8l7l6uFB",
                      "id7Utp4EJD-i0Hm-KaoA-I5PY-jPJmm2jFwPuc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id4hM0RiCc-NFyX-85Ih-uIC5-IukEPVvPIGxT",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "idmt55Kl8g-kWHv-3d0h-FcwJ-NQv1aFg3tnAq",
                      "id9JetdXL1-s4PJ-VyuO-Ctc0-fXTiQkfa5hbn"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idQ3NB5miY-02Wr-bdUT-imKO-qgE7EalvYzpg",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709053442499-Rectangle%20521%20%281%29.png",
                      "alt": "view3"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idA3N8USoF-hfuD-1XDe-gBqG-vpm7Q1w6QrbX",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idQ3NB5miY-02Wr-bdUT-imKO-qgE7EalvYzpg"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idKoRV52kP-XrRu-7RJf-asNs-K67b4GgBI3zk",
                  "text": true,
                  "v": "Chris Lee"
              },
              {
                  "_id": "id1LJ5UMJ7-PqGV-SFMr-TFzp-RQT9loxdgcLf",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idKoRV52kP-XrRu-7RJf-asNs-K67b4GgBI3zk"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idiTzF77Nm-RUWH-8iZv-0kq8-8drcJhCrvhQT",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idQG22widw-vsmE-6Oog-AuTb-xDy9fIDiTLyz",
                  "text": true,
                  "v": "Branding"
              },
              {
                  "_id": "iddUdcF2GX-EA7w-Stkf-TPz4-cy4Ws3roc9rV",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idQG22widw-vsmE-6Oog-AuTb-xDy9fIDiTLyz"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idMjsrCyEC-GpAn-ytV6-8CZ8-PQi0Lk0dFz1F",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "id1LJ5UMJ7-PqGV-SFMr-TFzp-RQT9loxdgcLf",
                      "idiTzF77Nm-RUWH-8iZv-0kq8-8drcJhCrvhQT",
                      "iddUdcF2GX-EA7w-Stkf-TPz4-cy4Ws3roc9rV"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id0a9tuOvD-23gB-HBZd-LF5b-BM5nHHI3MFox",
                  "text": true,
                  "v": "Brand design & identity for Chris"
              },
              {
                  "_id": "idt2q7x2VC-JpmF-9xhT-bEZ7-46DoRpSkaAkn",
                  "tag": "h3",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id0a9tuOvD-23gB-HBZd-LF5b-BM5nHHI3MFox"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idypJsEn0A-b1nO-KBKo-oDsF-tYFMrVeSAmG6",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idMjsrCyEC-GpAn-ytV6-8CZ8-PQi0Lk0dFz1F",
                      "idt2q7x2VC-JpmF-9xhT-bEZ7-46DoRpSkaAkn"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idJvZRg3NE-FTNP-vsFy-lnxl-jlZbSSJQ6lvn",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "idA3N8USoF-hfuD-1XDe-gBqG-vpm7Q1w6QrbX",
                      "idypJsEn0A-b1nO-KBKo-oDsF-tYFMrVeSAmG6"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idKBSkaJme-ln2O-YkD4-faDO-p7nGorQ4DNhj",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709053644938-Rectangle%20522.png",
                      "alt": "view4"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idq6JlAzCt-iQy7-Y0iK-p5DI-gvQLXbxfcx4d",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idKBSkaJme-ln2O-YkD4-faDO-p7nGorQ4DNhj"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idjDx0c6Cn-2v6P-zsfX-ytwg-AjOQrcMOziM3",
                  "text": true,
                  "v": "Senoner"
              },
              {
                  "_id": "idbpm9Rcvy-0MhG-SO4p-H3H5-QBzNtP8YITLF",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idjDx0c6Cn-2v6P-zsfX-ytwg-AjOQrcMOziM3"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idfNtJShjU-nLxu-fyG3-IEgR-X2ZCC8UjJF8V",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "id0anlDQNP-IEp3-CKsr-1U89-8FI0D0P0swKz",
                  "text": true,
                  "v": "Branding"
              },
              {
                  "_id": "idR6UmEIUS-GBl9-niFq-Ctze-2mvqtZ4wPHIt",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id0anlDQNP-IEp3-CKsr-1U89-8FI0D0P0swKz"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idVJMGtfYa-ah3N-bOw1-HZVK-KZF858jfeKTu",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idbpm9Rcvy-0MhG-SO4p-H3H5-QBzNtP8YITLF",
                      "idfNtJShjU-nLxu-fyG3-IEgR-X2ZCC8UjJF8V",
                      "idR6UmEIUS-GBl9-niFq-Ctze-2mvqtZ4wPHIt"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNVDt8lKw-Qkd3-hsyi-YXeA-6ooFIWOQhWUV",
                  "text": true,
                  "v": "Logo design & branding for Senoner"
              },
              {
                  "_id": "idfN8UrXFK-NvoO-61iC-aMeI-i3hSIHA7U85Z",
                  "tag": "h3",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNVDt8lKw-Qkd3-hsyi-YXeA-6ooFIWOQhWUV"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idgBEo1MYY-VyoQ-0wew-8fsN-PhCcVJDWwhK5",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idVJMGtfYa-ah3N-bOw1-HZVK-KZF858jfeKTu",
                      "idfN8UrXFK-NvoO-61iC-aMeI-i3hSIHA7U85Z"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idXqtd8Gi6-90tD-vIMa-GIeg-YEFnwFt2gCWC",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "idq6JlAzCt-iQy7-Y0iK-p5DI-gvQLXbxfcx4d",
                      "idgBEo1MYY-VyoQ-0wew-8fsN-PhCcVJDWwhK5"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idIwNAGKiu-t5Kl-LKne-7i9p-LC06WyTPM1FF",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709054056271-Rectangle%20523.png",
                      "alt": "view4"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idfbOiZGks-sUC6-Vy72-lJrW-ZmGdsRl3rDAg",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "idIwNAGKiu-t5Kl-LKne-7i9p-LC06WyTPM1FF"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idC2Q8BPCl-x3Bu-eTUV-f1zj-39eAQjpSFOHJ",
                  "text": true,
                  "v": "App Y"
              },
              {
                  "_id": "idEFZs7212-95rL-HpOB-gXCW-BeyLHn7pfrVo",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idC2Q8BPCl-x3Bu-eTUV-f1zj-39eAQjpSFOHJ"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id8kzv6ANI-wSnB-72nf-nQax-1ypia8QjYNzm",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "id1u7BEU6N-xOCR-tJjp-Dek4-5nzPvVikY8hL",
                  "text": true,
                  "v": "UI/UX"
              },
              {
                  "_id": "idXTN7MdCn-SkKu-EGn6-gbu8-Ao7AjSiSj1NJ",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id1u7BEU6N-xOCR-tJjp-Dek4-5nzPvVikY8hL"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idXHe38n7d-gnQu-TsMB-DQfl-Xqje9bEGkPig",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idEFZs7212-95rL-HpOB-gXCW-BeyLHn7pfrVo",
                      "id8kzv6ANI-wSnB-72nf-nQax-1ypia8QjYNzm",
                      "idXTN7MdCn-SkKu-EGn6-gbu8-Ao7AjSiSj1NJ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idgAzQ9iLv-TP2B-PzGC-VQMe-1wbYgULwOQFE",
                  "text": true,
                  "v": "Responsive design for a finance startup"
              },
              {
                  "_id": "idsBJCQT14-LL0M-nKNN-BAMv-LhJzhHxT6w71",
                  "tag": "h3",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idgAzQ9iLv-TP2B-PzGC-VQMe-1wbYgULwOQFE"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idG38OUGL1-jhHK-vYkr-XzBr-sk6vmq6djuKC",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idXHe38n7d-gnQu-TsMB-DQfl-Xqje9bEGkPig",
                      "idsBJCQT14-LL0M-nKNN-BAMv-LhJzhHxT6w71"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idt6TRMbcW-sTBe-8ZL1-faxe-WwbVUthdNDFJ",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "idfbOiZGks-sUC6-Vy72-lJrW-ZmGdsRl3rDAg",
                      "idG38OUGL1-jhHK-vYkr-XzBr-sk6vmq6djuKC"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id5xfXKND8-TCiB-ZkhZ-k6nZ-YFcjdAX8Udgu",
                  "tag": "img",
                  "classes": [
                      "portfolio-picture"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709054219038-Rectangle%20524.png",
                      "alt": "view5"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idp7j7C3vj-I56u-pCrD-7w8o-VMlstSnF0Kcv",
                  "tag": "div",
                  "classes": [
                      "portfolio_item-img"
                  ],
                  "data": {},
                  "children": [
                      "id5xfXKND8-TCiB-ZkhZ-k6nZ-YFcjdAX8Udgu"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idqs2DCtWp-ZQqj-z8Mj-0F0Z-yrKjx0lsryew",
                  "text": true,
                  "v": "Technology"
              },
              {
                  "_id": "idU5sKQDVN-u9bE-N6A5-uAjv-pI69kzEBCEsc",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idqs2DCtWp-ZQqj-z8Mj-0F0Z-yrKjx0lsryew"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idw6nNq8G2-U0zi-vqwJ-HsWb-xezLQHEkVYeQ",
                  "tag": "div",
                  "classes": [
                      "lineheight"
                  ],
                  "data": {},
                  "children": [],
                  "type": "Container"
              },
              {
                  "_id": "idfiR71v57-YIVj-NP7A-GhQw-rITblsJI49IT",
                  "text": true,
                  "v": "UI/UX"
              },
              {
                  "_id": "idns8xTY8v-IQQQ-P8sY-Pmpo-IBHKIahgeWe6",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idfiR71v57-YIVj-NP7A-GhQw-rITblsJI49IT"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idVU1pHwPr-WpCE-MlTi-Lujs-fZPxvHuB81dQ",
                  "tag": "div",
                  "classes": [
                      "linestyle"
                  ],
                  "data": {},
                  "children": [
                      "idU5sKQDVN-u9bE-N6A5-uAjv-pI69kzEBCEsc",
                      "idw6nNq8G2-U0zi-vqwJ-HsWb-xezLQHEkVYeQ",
                      "idns8xTY8v-IQQQ-P8sY-Pmpo-IBHKIahgeWe6"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id2aGSKk36-hBvj-bICr-m4Z3-LOa3VIlYbmbK",
                  "text": true,
                  "v": "Responsive design for a Technology app"
              },
              {
                  "_id": "ideJwr3tMp-9VmS-Pc8h-j4c5-TQHy9LxxpG4M",
                  "tag": "h3",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id2aGSKk36-hBvj-bICr-m4Z3-LOa3VIlYbmbK"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "id6HOsHf2w-eWRY-LKGL-MOPz-iBUdfd49Gejm",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idVU1pHwPr-WpCE-MlTi-Lujs-fZPxvHuB81dQ",
                      "ideJwr3tMp-9VmS-Pc8h-j4c5-TQHy9LxxpG4M"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idTVdJpTcJ-jd5q-oQuh-Jfbu-xGXizQgbIiUp",
                  "tag": "div",
                  "classes": [
                      "portfolio_item"
                  ],
                  "data": {},
                  "children": [
                      "idp7j7C3vj-I56u-pCrD-7w8o-VMlstSnF0Kcv",
                      "id6HOsHf2w-eWRY-LKGL-MOPz-iBUdfd49Gejm"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id6ZNi5Cpu-Y2Hc-nTeX-dMqh-WANOzLbYRXNg",
                  "tag": "div",
                  "classes": [
                      "portfolio-image"
                  ],
                  "data": {},
                  "children": [
                      "idZ75Lk6lY-AqHZ-CrB8-sHEX-dtlNCM2EOp0V",
                      "id4hM0RiCc-NFyX-85Ih-uIC5-IukEPVvPIGxT",
                      "idJvZRg3NE-FTNP-vsFy-lnxl-jlZbSSJQ6lvn",
                      "idXqtd8Gi6-90tD-vIMa-GIeg-YEFnwFt2gCWC",
                      "idt6TRMbcW-sTBe-8ZL1-faxe-WwbVUthdNDFJ",
                      "idTVdJpTcJ-jd5q-oQuh-Jfbu-xGXizQgbIiUp"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idmDOQEkuB-zS94-YH3c-ztzm-jgWSh23Hw7xi",
                  "text": true,
                  "v": "Follow me"
              },
              {
                  "_id": "idt5OSf56p-doQ1-NJsA-hjQh-NxDHGPOiC865",
                  "tag": "h3",
                  "classes": [
                      "follow-me"
                  ],
                  "data": {},
                  "children": [
                      "idmDOQEkuB-zS94-YH3c-ztzm-jgWSh23Hw7xi"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idgqXO4UaY-a7YH-JOer-a6uj-v9WDPrWNlTBp",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709087810837-linkedin.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idNtCB84Lp-QR71-vO5X-EdOl-RZmIHJsG72GA",
                  "text": true,
                  "v": "Linkedin"
              },
              {
                  "_id": "idhWbqepxE-W16M-yB4U-nc0O-6oOxHBoAK5g9",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNtCB84Lp-QR71-vO5X-EdOl-RZmIHJsG72GA"
                  ]
              },
              {
                  "_id": "idHxC4wisz-fyNs-3tuk-1usq-O4kKplNy3jBI",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idgqXO4UaY-a7YH-JOer-a6uj-v9WDPrWNlTBp",
                      "idhWbqepxE-W16M-yB4U-nc0O-6oOxHBoAK5g9"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id2yUMs5vs-TsEw-sot6-LSPb-obvDfzZuOFYZ",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088090774-twitter.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idDWqPxwcN-K1ru-PkqG-pWaX-QTHbWVaArxtp",
                  "text": true,
                  "v": "Twitter"
              },
              {
                  "_id": "idG98lKwxp-4V4f-aKcH-eoNK-qIIjYLixCrNK",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idDWqPxwcN-K1ru-PkqG-pWaX-QTHbWVaArxtp"
                  ]
              },
              {
                  "_id": "idFs1Cdxvp-LZMn-ns9X-KXIQ-avSfyDIw30Ae",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "id2yUMs5vs-TsEw-sot6-LSPb-obvDfzZuOFYZ",
                      "idG98lKwxp-4V4f-aKcH-eoNK-qIIjYLixCrNK"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idU2PSyp4I-i2KF-T8Kn-vL7B-aPwuIptk6nHp",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088195528-instagram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idxQGu56IN-cUdl-FY3N-xXKN-b5h4hW0HMEx9",
                  "text": true,
                  "v": "Instagram"
              },
              {
                  "_id": "idoaQ0iRVD-DrYE-h4K2-o9pd-xPkyUNKM7sIT",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idxQGu56IN-cUdl-FY3N-xXKN-b5h4hW0HMEx9"
                  ]
              },
              {
                  "_id": "idrIdmH7y8-2OqZ-eC0t-Pu5u-i8gVAoOaNZPc",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idU2PSyp4I-i2KF-T8Kn-vL7B-aPwuIptk6nHp",
                      "idoaQ0iRVD-DrYE-h4K2-o9pd-xPkyUNKM7sIT"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idSIdc06Pa-M9Lz-A1KX-596A-iZSGkvrg0ZL5",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idHxC4wisz-fyNs-3tuk-1usq-O4kKplNy3jBI",
                      "idFs1Cdxvp-LZMn-ns9X-KXIQ-avSfyDIw30Ae",
                      "idrIdmH7y8-2OqZ-eC0t-Pu5u-i8gVAoOaNZPc"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1bmWHgMU-ljOv-XIX9-Dip0-QcSFlcqmst5V",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088362442-Facebook.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idAWmXJhgk-ChcR-aVte-HWEI-o9ToYfbKVWQO",
                  "text": true,
                  "v": "Facebook"
              },
              {
                  "_id": "idQxdd5atH-k06k-WJBw-iHmw-nnzRTa60CEI3",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idAWmXJhgk-ChcR-aVte-HWEI-o9ToYfbKVWQO"
                  ]
              },
              {
                  "_id": "idX4yGVoUM-G94C-GWxC-K2V1-GhtaPJRSPkKY",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "id1bmWHgMU-ljOv-XIX9-Dip0-QcSFlcqmst5V",
                      "idQxdd5atH-k06k-WJBw-iHmw-nnzRTa60CEI3"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idojZh5sCv-nQuh-EJWe-5IB0-WRUDtBkmcDVQ",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088546423-youtube.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id3L4Bt9cN-lBDI-cg1w-dOQE-FLwHLzqYVXF8",
                  "text": true,
                  "v": "Youtube"
              },
              {
                  "_id": "idPhZyDhb3-xpsE-hVsw-Uu94-ypwylKrwDUkf",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id3L4Bt9cN-lBDI-cg1w-dOQE-FLwHLzqYVXF8"
                  ]
              },
              {
                  "_id": "idfrowGKEF-83mC-YWoj-Ped8-zATKlswjHc1A",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idojZh5sCv-nQuh-EJWe-5IB0-WRUDtBkmcDVQ",
                      "idPhZyDhb3-xpsE-hVsw-Uu94-ypwylKrwDUkf"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxUWhun8E-xsZY-XscR-HGSa-DAm4xYceFlMF",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088617221-dribbble.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idjSYrztVv-1Zq2-lNyG-dytH-YsSvjuSTL1Qf",
                  "text": true,
                  "v": "Dribble"
              },
              {
                  "_id": "idEuWAxUmu-1eFJ-ecRa-75oV-jFtgtg4tagZZ",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idjSYrztVv-1Zq2-lNyG-dytH-YsSvjuSTL1Qf"
                  ]
              },
              {
                  "_id": "idHEcJGqXI-dmG5-zkHJ-ymwe-qhwpQeV16HK0",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idxUWhun8E-xsZY-XscR-HGSa-DAm4xYceFlMF",
                      "idEuWAxUmu-1eFJ-ecRa-75oV-jFtgtg4tagZZ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idC5HHGJYb-m0dV-We6e-3J7v-0k3ujk0sVS2a",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idX4yGVoUM-G94C-GWxC-K2V1-GhtaPJRSPkKY",
                      "idfrowGKEF-83mC-YWoj-Ped8-zATKlswjHc1A",
                      "idHEcJGqXI-dmG5-zkHJ-ymwe-qhwpQeV16HK0"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idTTuHLjpM-ExZK-paYa-7r6l-Jmlmxwq2LWAu",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089122414-telegram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idK3vGFv8Z-8l5L-2xFV-Hl8b-Kdq87KdYqPTa",
                  "text": true,
                  "v": "Telegram"
              },
              {
                  "_id": "id7KEs0NlD-nIw8-jCuh-jR6q-8oNUVTAw98aw",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idK3vGFv8Z-8l5L-2xFV-Hl8b-Kdq87KdYqPTa"
                  ]
              },
              {
                  "_id": "idt3dUmMZ9-Rx41-o2hN-ORQA-xWC3Q9szMXYQ",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idTTuHLjpM-ExZK-paYa-7r6l-Jmlmxwq2LWAu",
                      "id7KEs0NlD-nIw8-jCuh-jR6q-8oNUVTAw98aw"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idXHbAISgd-Fy3j-khqT-3pYz-xA5E9ZyMox9Y",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089177123-whatsapp.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idJVj2anUg-U5B7-pe1g-NeM6-msxPrpUDSQnK",
                  "text": true,
                  "v": "Whatsapp"
              },
              {
                  "_id": "idmxNkSt62-uC2N-r7Hx-brJ3-dir4TLQSGJpk",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idJVj2anUg-U5B7-pe1g-NeM6-msxPrpUDSQnK"
                  ]
              },
              {
                  "_id": "idnQAHUJKf-0fiH-ifAt-kSaQ-7PFE1VsrIYgB",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idXHbAISgd-Fy3j-khqT-3pYz-xA5E9ZyMox9Y",
                      "idmxNkSt62-uC2N-r7Hx-brJ3-dir4TLQSGJpk"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idxW1lpVzN-yQQ8-ortM-gHNV-V65AQAqhFbHL",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089232947-behance.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idoDKETk7W-bUG5-gBw9-KM4S-Etd8lVwqYeas",
                  "text": true,
                  "v": "Behance"
              },
              {
                  "_id": "idXljejAo8-PiPs-19zt-RdDZ-HWogFGzUybaR",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idoDKETk7W-bUG5-gBw9-KM4S-Etd8lVwqYeas"
                  ]
              },
              {
                  "_id": "ideKWNWrT4-SRiQ-BaDt-r3JM-cUkfO5oWiPaW",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idxW1lpVzN-yQQ8-ortM-gHNV-V65AQAqhFbHL",
                      "idXljejAo8-PiPs-19zt-RdDZ-HWogFGzUybaR"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idEnccimln-BCc4-7OjJ-5nPj-Rhh0UJrmI72r",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idt3dUmMZ9-Rx41-o2hN-ORQA-xWC3Q9szMXYQ",
                      "idnQAHUJKf-0fiH-ifAt-kSaQ-7PFE1VsrIYgB",
                      "ideKWNWrT4-SRiQ-BaDt-r3JM-cUkfO5oWiPaW"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idf4n4yFFJ-aTSg-ACzO-y3KZ-SnvqLcGwuWnd",
                  "tag": "div",
                  "classes": [
                      "follow"
                  ],
                  "data": {},
                  "children": [
                      "idt5OSf56p-doQ1-NJsA-hjQh-NxDHGPOiC865",
                      "idSIdc06Pa-M9Lz-A1KX-596A-iZSGkvrg0ZL5",
                      "idC5HHGJYb-m0dV-We6e-3J7v-0k3ujk0sVS2a",
                      "idEnccimln-BCc4-7OjJ-5nPj-Rhh0UJrmI72r"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idsJsD5YIf-cX3L-AN5B-NCEu-yahFuuLqFzuH",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idf4n4yFFJ-aTSg-ACzO-y3KZ-SnvqLcGwuWnd"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idKzjnQRnY-f79U-IOPT-zvFy-5HwJCZAWCESg",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idyfeyGqPU-4qJN-elYr-VWPO-yIc7ntHfbWHh",
                  "tag": "h3",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {},
                  "children": [
                      "idKzjnQRnY-f79U-IOPT-zvFy-5HwJCZAWCESg"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idGQK8FdZl-cVzQ-JLHx-hnAb-XTIHyAZR7ePF",
                  "text": true,
                  "v": "I'm Akin Matthews, a designer passionate about creating"
              },
              {
                  "_id": "idg2OhOjVr-BVW4-bYMI-JTSp-EPHGhmSVrUKP",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": []
              },
              {
                  "_id": "idrxygC0ED-XU8V-AH0F-vR1s-1mvC2I0H5pTq",
                  "text": true,
                  "v": "beautiful, usable and accessible designs for individuals."
              },
              {
                  "_id": "idCOB0N5uO-7j69-yWrU-6EqL-wydOvDQja2vg",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idGQK8FdZl-cVzQ-JLHx-hnAb-XTIHyAZR7ePF",
                      "idg2OhOjVr-BVW4-bYMI-JTSp-EPHGhmSVrUKP",
                      "idrxygC0ED-XU8V-AH0F-vR1s-1mvC2I0H5pTq"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id3aoAkuAU-eIa3-1Byi-BfpL-2Eq1hANWGne6",
                  "tag": "div",
                  "classes": [
                      "footer-up"
                  ],
                  "data": {},
                  "children": [
                      "idyfeyGqPU-4qJN-elYr-VWPO-yIc7ntHfbWHh",
                      "idCOB0N5uO-7j69-yWrU-6EqL-wydOvDQja2vg"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idzvS4scZq-u7ph-5tCB-NLjz-ykY8ipn7Srzt",
                  "text": true,
                  "v": "Product"
              },
              {
                  "_id": "idmfG1e7zB-iHEg-ki8p-QGbg-FL6afa5QUkfK",
                  "tag": "h4",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idzvS4scZq-u7ph-5tCB-NLjz-ykY8ipn7Srzt"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idCCntDUBG-MRbh-P5KN-rmsi-ttW4NwcnE1mh",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idVAApA9AV-kRXI-eKBs-Ygtn-1oaVlwfs4AbX",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idCCntDUBG-MRbh-P5KN-rmsi-ttW4NwcnE1mh"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idlzCprVxb-kPNZ-jgWF-dbVd-SPQcgA06yr9w",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idaj8nEj5I-OmVU-9lVh-MLxR-mLLYwSHLd4mf",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idlzCprVxb-kPNZ-jgWF-dbVd-SPQcgA06yr9w"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id9YBq923k-jCoh-8Co8-TM0F-XlHqqjsED1e8",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "id1QCwzMyy-cZYg-KrJq-W2fm-A3NQuq0w8yoP",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id9YBq923k-jCoh-8Co8-TM0F-XlHqqjsED1e8"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "iduiqdZN7F-4VJa-kyyF-byOl-48JOrzy84imH",
                  "tag": "div",
                  "classes": [
                      "footer-down"
                  ],
                  "data": {},
                  "children": [
                      "idmfG1e7zB-iHEg-ki8p-QGbg-FL6afa5QUkfK",
                      "idVAApA9AV-kRXI-eKBs-Ygtn-1oaVlwfs4AbX",
                      "idaj8nEj5I-OmVU-9lVh-MLxR-mLLYwSHLd4mf",
                      "id1QCwzMyy-cZYg-KrJq-W2fm-A3NQuq0w8yoP"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idOZfSfwAY-6De7-pU2c-jFdq-z2czieYQsWT9",
                  "tag": "div",
                  "classes": [
                      "footer"
                  ],
                  "data": {},
                  "children": [
                      "id3aoAkuAU-eIa3-1Byi-BfpL-2Eq1hANWGne6",
                      "iduiqdZN7F-4VJa-kyyF-byOl-48JOrzy84imH"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idNwY6oTp3-cVTu-eNtp-IvvL-mst8oQ36snkE",
                  "text": true,
                  "v": "Copyright © Tailorflow"
              },
              {
                  "_id": "idQR3JMqgA-ey32-ei9O-QZiy-AnEyJDPCK342",
                  "tag": "p",
                  "classes": [
                      "copy-right"
                  ],
                  "data": {},
                  "children": [
                      "idNwY6oTp3-cVTu-eNtp-IvvL-mst8oQ36snkE"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idjinGytWi-AeET-9EDc-qpxK-70D10WQxroZI",
                  "tag": "footer",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idOZfSfwAY-6De7-pU2c-jFdq-z2czieYQsWT9",
                      "idQR3JMqgA-ey32-ei9O-QZiy-AnEyJDPCK342"
                  ],
                  "type": "Footer-section"
              }
          ],
            "styles":{
              "data": {
                  "appliedStylesMap": {},
                  "breakpoints": {
                  }, 
                  "macros": [], "migrations": {"stylesNext": true}, "swatches": []
              },
              "style":[
                  {
                      "style_id": "811f2855-6dcd-4707-8e22-d8203c63c8b9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "*, ::before, ::after",
                          "sel": "*, ::before, ::after",
                          "styleLess": "box-sizing: border-box;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "3e2f3e35-6d18-4378-9dff-36b188ce3bd4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "html, body",
                          "sel": "html, body",
                          "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1300px; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a212c2a8-6cc5-4dd1-bbe5-39c5cd3241f9",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "body",
                          "sel": "body",
                          "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "50087d3d-094d-49e7-b5ab-40f1933e28c0",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "img",
                          "sel": "img",
                          "styleLess": "display: block;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "378b9da2-4e1d-4cf0-b0dc-26fecb1bf88b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "ul",
                          "sel": "ul",
                          "styleLess": "list-style: none; padding: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4a4bd12d-8a08-4ebd-80b0-3f7ee8459000",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "a",
                          "sel": "a",
                          "styleLess": "text-decoration: none; color: black;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "ce661049-3403-4c25-bb45-47e250b64ad2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "p, h1, h2, h3, h4, h5, h6",
                          "sel": "p, h1, h2, h3, h4, h5, h6",
                          "styleLess": "overflow-wrap: break-word; margin: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7802c03b-7b6d-4c79-9a8c-2caee02623a2",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "#portfoliomain",
                          "sel": "#portfoliomain",
                          "styleLess": "padding: 2em 0.8em;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": "#portfoliomain",
                                  "styleLess": "padding: 2em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "3d3d58f6-2bb0-4c0c-9430-e516ee25a158",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".note",
                          "styleLess": "line-height: 25px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "86df60fd-2538-4d3f-9161-2e7529ac8b0c",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "hr",
                          "sel": "hr",
                          "styleLess": "margin: 2.5em 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "5b6d283a-bfac-40ff-8851-0e343aa568b5",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header",
                          "styleLess": "display: flex; justify-content: space-between; align-items: center; gap: 10px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".header",
                                  "styleLess": "display: flex; justify-content: space-between; gap: 40px; padding-right: 30px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "5d6d516b-abf9-4137-abe6-68a27379fbf4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".menu-icon",
                          "styleLess": "width: 40px; height: 40px;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: block;"
                              },
                              "medium": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "cab223c2-2bd1-454d-9c2c-ddf3104b35df",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".tailorflow",
                          "styleLess": "text-decoration: none; font-weight: 600; font-size: 25px; color: rgb(0, 52, 53);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a0ab03a5-2042-45ae-a876-655099053fdb",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header-list",
                          "styleLess": "display: none;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-list",
                                  "styleLess": "display: none;"
                              },
                              "medium": {
                                  "sel": ".header-list",
                                  "styleLess": "display: flex; padding: 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "5588de8b-8233-49a3-bfef-99425af56a70",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".portfolio-picture",
                          "styleLess": "width: 350px; height: 400px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "b9c0e2ef-f294-4b85-b59b-09d5f6c02098",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".hero",
                          "styleLess": "display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 2em 0px; gap: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "d787af58-cfed-401b-859d-aaf24465aaea",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".hero_top",
                          "styleLess": "text-align: center;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "31f43d55-8d16-4b27-aeb1-080e46519c93",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".hero_top > h2",
                          "styleLess": "font-size: 2.5em; margin-bottom: 0.5em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "ca6223f9-d996-41c0-a9a6-e288d0ab8ad6",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".hero_bottom",
                          "styleLess": "display: flex; gap: 1em; justify-content: center; align-items: center; flex-wrap: wrap; width: 100%;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "56648229-3be9-4799-bdf4-5d8e36906157",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".hero_bottom > p",
                          "styleLess": "padding: 0.5em 0.7em; width: 105px; text-align: center;",
                          "type": "class",
                          "variants": {
                              "tiny": {
                                  "sel": ".hero_bottom > p",
                                  "styleLess": "width: 150px;"
                              },
                              "small": {
                                  "sel": ".hero_bottom > p",
                                  "styleLess": "width: 130px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "5f96be0e-1617-43e9-afff-1c7915523e20",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".portfolio_item",
                          "styleLess": "margin: 2em 0px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".portfolio_item",
                                  "styleLess": "width: 45%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "b71019b9-1ea5-4572-b443-6b44d349e1a7",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".portfolio_item-img",
                          "styleLess": "width: 98%; padding: 0px; overflow: hidden; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7c122e9c-c3bf-411f-942f-acae653e8179",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".portfolio-picture",
                          "styleLess": "width: 100%; height: 100%; object-fit: cover; object-position: center center;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "917bbdd7-4c23-4f8c-8fe4-65ef26383271",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".branding",
                          "styleLess": "border: 1px solid rgb(217, 217, 217); background-color: rgb(242, 244, 247);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7de9c339-0255-4de6-a550-3077fa8702d5",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".projects",
                          "styleLess": "color: white; background-color: black;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "94c62443-1609-4430-9df5-77717992cb2a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".uiux",
                          "styleLess": "border: 1px solid rgb(217, 217, 217); background-color: rgb(242, 244, 247);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "3a930fcc-16f0-4a66-b928-9202770fd44f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".industrial",
                          "styleLess": "border: 1px solid rgb(217, 217, 217); background-color: rgb(242, 244, 247);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "9a349d11-0461-4196-99f4-bdbd044d7369",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".linestyle",
                          "styleLess": "display: flex; gap: 0.5em; margin: 0.6em 0px 0px; width: 170px; color: rgb(152, 162, 179);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "41b644f6-87c5-4f4f-8276-332405a5508f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".lineheight",
                          "styleLess": "width: 17px; height: 1px; align-self: center; background-color: rgb(152, 162, 179);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "594d9cd9-3074-4e8f-b222-0fef7ae38298",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em; margin-bottom: 2em;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow",
                                  "styleLess": "margin: 5em 0px; gap: 1em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "97aa465d-5b97-4742-8a5b-0afb6655066a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow-me",
                          "styleLess": "font-size: 1.5em; letter-spacing: 0.05em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "b229c19b-6fa3-4492-a028-8647c92a10f4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".icon-list",
                          "styleLess": "display: flex; align-items: center; gap: 0.5em; margin-bottom: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "40b0706a-7557-4054-a6b7-6c416af2434d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "81a2eebd-e81b-4022-8dea-054737752f37",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer-up, .footer-down",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; font-size: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "800995b9-1b12-471e-9f62-bf1253b80e77",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".copy-right",
                          "styleLess": "margin-top: 1.5em; font-size: 0.9em; color: rgb(52, 64, 84);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "5df437c1-805e-4413-b796-58777a84a42e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".header-icons",
                          "sel": ".header-icons",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              },
                              "medium": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "81c938f9-3d11-463e-b7e3-21ae5faa362b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".follow, .footer",
                          "sel": ".follow, .footer",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow, .footer",
                                  "styleLess": "display: flex; flex-direction: row; align-items: center; justify-content: space-between;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "8cf8ade5-d5e9-45b5-9e5e-2d33e796084f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".footer-down",
                          "sel": ".footer-down",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".footer-down",
                                  "styleLess": "width: 40%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "2983e95f-7273-4fb6-b31e-3c5318b61c0a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "li",
                          "sel": "li",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "d3b762e1-8e7a-4bb1-9e88-fb343a59849c",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".portfolio-image",
                          "sel": ".portfolio-image",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".portfolio-image",
                                  "styleLess": "display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; align-items: center;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "cb6500fb-94a3-472f-98fb-20947fe9e9c3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".portfolio",
                          "sel": ".portfolio",
                          "styleLess": "",
                          "type": "class",
                          "variants": {}
                      }
                  }
              ]
            }
        },
        {
            "route":"./contact.html",
            "name":"Contact page",
            "head":{
                "title":"Contact page",
                "description":"This is the contact page"
            },
            "slug":"gVGW-vQL7-Ye87JFZkhgDgFA",           
            "page id": "idKJySpRNU-WBFS-uQPS-aJ1T-bI1n8lYxqPyK",
            "nodes":[
              {
                  "_id": "idn0x7qx1z-gFcH-zZDq-fGjX-3BNFTSEwW0bN",
                  "tag": "main",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idPbjnd87I-WIqf-1pt0-EZtX-5r0L3mySxHps",
                      "idmLVKs8fh-JHIq-eTVo-fQo4-wpPeaW7TaUvj",
                      "id9HAqjqmO-rgzF-NVQq-ZllY-ZdAhlSImZZM4",
                      "idnvdeLvLq-tLoK-Wjcm-QEc8-QN10KPcs6I3Y",
                      "idrpJAQg5d-Y1t1-Vnx0-DCpi-XrM9ajDtrSnk"
                  ],
                  "type": "Main"
              },
              {
                  "_id": "idf5pL37KD-cFaQ-AkwH-o0qS-H4MSyafqOq5C",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idI4XLBTQg-lp4W-oTMf-Dsnt-xGn5jJykEWdK",
                  "tag": "a",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {
                      "href": "./index.html"
                  },
                  "children": [
                      "idf5pL37KD-cFaQ-AkwH-o0qS-H4MSyafqOq5C"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idfGYk8WUd-OG3U-0apq-8AjC-Ww8nu0aNR1VN",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idI4XLBTQg-lp4W-oTMf-Dsnt-xGn5jJykEWdK"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idRsxTuS0W-TmJN-Ejva-6XhN-AaJGUwbCg9T9",
                  "tag": "ul",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idfGYk8WUd-OG3U-0apq-8AjC-Ww8nu0aNR1VN"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "idqAehaCbg-c38n-o8Qt-1YnT-cNN4IXXaja1b",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idEUAsvGGC-Woau-YQsj-uaEz-lTAL9RPuOUbX",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./about.html"
                  },
                  "children": [
                      "idqAehaCbg-c38n-o8Qt-1YnT-cNN4IXXaja1b"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idiUtkNyzM-M2xt-CEb4-da0e-GcDYCHHEY1SQ",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idEUAsvGGC-Woau-YQsj-uaEz-lTAL9RPuOUbX"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idvKMnZp6t-DPls-L0X4-ktnh-fBKWAr963rGZ",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idqNRzakR2-xCpH-xxST-vrVR-zZ9nxnSY8zrK",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./portfolioDetails.html"
                  },
                  "children": [
                      "idvKMnZp6t-DPls-L0X4-ktnh-fBKWAr963rGZ"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "idUMdS4jss-Feza-dVfl-7Oxi-plLn65aqhTmy",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idqNRzakR2-xCpH-xxST-vrVR-zZ9nxnSY8zrK"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idcNsYpu2u-xcNV-uTpw-Sbj6-uaDGBBRwkXvo",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idXoD4xMRE-mGSo-FncD-2LnA-SszZwL0J3N6E",
                  "tag": "a",
                  "classes": [
                      "header-icons"
                  ],
                  "data": {
                      "href": "./contact.html"
                  },
                  "children": [
                      "idcNsYpu2u-xcNV-uTpw-Sbj6-uaDGBBRwkXvo"
                  ],
                  "type": "Link"
              },
              {
                  "_id": "iddPps7Pw6-Z6wc-H1VY-J9Pj-xifKnkBRmb1y",
                  "tag": "li",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idXoD4xMRE-mGSo-FncD-2LnA-SszZwL0J3N6E"
                  ],
                  "type": "List item"
              },
              {
                  "_id": "idGpxXc7PS-7uG1-PnX6-nWCZ-aFeSTxpjeg1y",
                  "tag": "ul",
                  "classes": [
                      "header",
                      "header-list"
                  ],
                  "data": {},
                  "children": [
                      "idiUtkNyzM-M2xt-CEb4-da0e-GcDYCHHEY1SQ",
                      "idUMdS4jss-Feza-dVfl-7Oxi-plLn65aqhTmy",
                      "iddPps7Pw6-Z6wc-H1VY-J9Pj-xifKnkBRmb1y"
                  ],
                  "type": "Unordered list"
              },
              {
                  "_id": "idYUH8HUL3-5smj-7PAc-g5GV-PaK7CukmZw6T",
                  "tag": "img",
                  "classes": [
                      "menu-icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709418812514-Menu%20Icon.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idA3d9mQ8I-8CZe-GFVQ-OlJw-WxGbWciv521S",
                  "tag": "nav",
                  "classes": [
                      "header"
                  ],
                  "data": {},
                  "children": [
                      "idRsxTuS0W-TmJN-Ejva-6XhN-AaJGUwbCg9T9",
                      "idGpxXc7PS-7uG1-PnX6-nWCZ-aFeSTxpjeg1y",
                      "idYUH8HUL3-5smj-7PAc-g5GV-PaK7CukmZw6T"
                  ],
                  "type": "Navigation"
              },
              {
                  "_id": "idPbjnd87I-WIqf-1pt0-EZtX-5r0L3mySxHps",
                  "tag": "header",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idA3d9mQ8I-8CZe-GFVQ-OlJw-WxGbWciv521S"
                  ],
                  "type": "Header"
              },
              {
                  "_id": "idmLVKs8fh-JHIq-eTVo-fQo4-wpPeaW7TaUvj",
                  "tag": "hr",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Horizontal line"
              },
              {
                  "_id": "idV7XDciBM-l6G5-SmmR-97Ow-cv0NLyMViVOS",
                  "text": true,
                  "v": "Get in touch."
              },
              {
                  "_id": "idMom3ybe1-3Hdv-A9mc-lUDe-miWmUOHaRxVM",
                  "tag": "h2",
                  "classes": [
                      "get-in-touch"
                  ],
                  "data": {},
                  "children": [
                      "idV7XDciBM-l6G5-SmmR-97Ow-cv0NLyMViVOS"
                  ],
                  "type": "Heading 2"
              },
              {
                  "_id": "idSBlgraJa-gnX2-C8Lc-Rrnm-3slVS4cqHo7l",
                  "text": true,
                  "v": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              },
              {
                  "_id": "idgfIKiopx-nxf5-EUG3-ls0p-Yxru9CBEqCOl",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idcK3zoeyU-9wYX-zrTG-ZpNU-DoMklWFrH6J7",
                  "text": true,
                  "v": "eiusmod tempor incididunt ut labore et dolore magna aliqua."
              },
              {
                  "_id": "idD0Trcq8c-KnkB-Cmrg-kf4f-j66yUI9lSiCs",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idSBlgraJa-gnX2-C8Lc-Rrnm-3slVS4cqHo7l",
                      "idgfIKiopx-nxf5-EUG3-ls0p-Yxru9CBEqCOl",
                      "idcK3zoeyU-9wYX-zrTG-ZpNU-DoMklWFrH6J7"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idsRj6FbA5-lgh9-0JhK-wCUA-gAV8H43R5dtf",
                  "tag": "div",
                  "classes": [
                      "working-page"
                  ],
                  "data": {},
                  "children": [
                      "idMom3ybe1-3Hdv-A9mc-lUDe-miWmUOHaRxVM",
                      "idD0Trcq8c-KnkB-Cmrg-kf4f-j66yUI9lSiCs"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idiEdygQRo-lpRo-O0M6-Xn76-V1m9M0TeOAb2",
                  "text": true,
                  "v": "Facebook"
              },
              {
                  "_id": "idOL8KZlNT-33Av-aOXM-JZfc-XIrjuwPOr4Mc",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idiEdygQRo-lpRo-O0M6-Xn76-V1m9M0TeOAb2"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idHAynzCMC-YqKz-6X3t-o1tP-XxpJ5B4mRlRy",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id5WlOI07O-G0Px-Llyo-8Dx1-Y85H8yfuboCU",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idOL8KZlNT-33Av-aOXM-JZfc-XIrjuwPOr4Mc",
                      "idHAynzCMC-YqKz-6X3t-o1tP-XxpJ5B4mRlRy"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idWIUnmhMa-hjJJ-RDhV-2Dru-R0UnMq0ueD1y",
                  "text": true,
                  "v": "Dribble"
              },
              {
                  "_id": "idXWEt4iig-lR6K-ahRP-ovq7-BgdSttgrB0oA",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idWIUnmhMa-hjJJ-RDhV-2Dru-R0UnMq0ueD1y"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idrJzEQCWW-Gpft-d0ZQ-fB7Q-c12sR3g8ckhF",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id2Y3BLD5g-djWk-uWzK-7yhg-DdZ9fsefpCWa",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idXWEt4iig-lR6K-ahRP-ovq7-BgdSttgrB0oA",
                      "idrJzEQCWW-Gpft-d0ZQ-fB7Q-c12sR3g8ckhF"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "iddtksOKlc-YwjY-4Hn9-3oj2-Oslc8JTn6GtC",
                  "text": true,
                  "v": "Instagram"
              },
              {
                  "_id": "idHQ02E3te-6RjN-9fMB-yCAA-RTMkEsyG1wWx",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "iddtksOKlc-YwjY-4Hn9-3oj2-Oslc8JTn6GtC"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idO3ZV43g8-O9Jp-Q1SV-Ddw3-0BeNH75VeCYe",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idOf2mAIT5-BAsA-nDrO-QajQ-DwfW81Bd56kI",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idHQ02E3te-6RjN-9fMB-yCAA-RTMkEsyG1wWx",
                      "idO3ZV43g8-O9Jp-Q1SV-Ddw3-0BeNH75VeCYe"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id7tQ3yZKU-ZKfr-iiLL-q7vd-iKlHgHcRVXVH",
                  "text": true,
                  "v": "LinkedIn"
              },
              {
                  "_id": "idrIUlzseJ-SlKh-Xj6C-AJjO-LJRyYHAFfJkK",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id7tQ3yZKU-ZKfr-iiLL-q7vd-iKlHgHcRVXVH"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idaXZ1iy6L-y5fb-ECG0-Byds-gygJFdCcVTmd",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idXk0oGAyU-JkLK-6uBz-JXYX-XcPeq2uBkngO",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "idrIUlzseJ-SlKh-Xj6C-AJjO-LJRyYHAFfJkK",
                      "idaXZ1iy6L-y5fb-ECG0-Byds-gygJFdCcVTmd"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id72JzUteL-pmvc-3Zn7-MOnt-FvWLkI5zKv2S",
                  "text": true,
                  "v": "Twitter"
              },
              {
                  "_id": "id4kciW1NX-DjUH-LfGE-TZyT-4ja5f9QEhgPc",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id72JzUteL-pmvc-3Zn7-MOnt-FvWLkI5zKv2S"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idNNMVx3n8-HdGF-edhF-VkzR-B98FKlDINJiL",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idJNu7XQhk-D5ub-ROJS-uCID-iwMb0d9BFZDH",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "id4kciW1NX-DjUH-LfGE-TZyT-4ja5f9QEhgPc",
                      "idNNMVx3n8-HdGF-edhF-VkzR-B98FKlDINJiL"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idsrcWBQnb-zjpg-5bjO-uLt2-oNyQvnKDsy49",
                  "text": true,
                  "v": "Behance"
              },
              {
                  "_id": "ids9o2MI4e-EESD-bxxj-klmg-1Bkck0bDlwIh",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idsrcWBQnb-zjpg-5bjO-uLt2-oNyQvnKDsy49"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idoiv1g55O-jvIs-FP07-zK7m-QUMn8tAAj8vC",
                  "tag": "img",
                  "classes": [
                      "arrow-image"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709137969055-arrow-narrow-up-right.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idT6FPQe0c-2TGK-y3s7-eLB1-5ViJOAtoeljq",
                  "tag": "div",
                  "classes": [
                      "arrow"
                  ],
                  "data": {},
                  "children": [
                      "ids9o2MI4e-EESD-bxxj-klmg-1Bkck0bDlwIh",
                      "idoiv1g55O-jvIs-FP07-zK7m-QUMn8tAAj8vC"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idG64iYiZF-AIVm-3ZfB-zi6P-5BdiMGEiFgN5",
                  "tag": "div",
                  "classes": [
                      "contacts-icon"
                  ],
                  "data": {},
                  "children": [
                      "id5WlOI07O-G0Px-Llyo-8Dx1-Y85H8yfuboCU",
                      "id2Y3BLD5g-djWk-uWzK-7yhg-DdZ9fsefpCWa",
                      "idOf2mAIT5-BAsA-nDrO-QajQ-DwfW81Bd56kI",
                      "idXk0oGAyU-JkLK-6uBz-JXYX-XcPeq2uBkngO",
                      "idJNu7XQhk-D5ub-ROJS-uCID-iwMb0d9BFZDH",
                      "idT6FPQe0c-2TGK-y3s7-eLB1-5ViJOAtoeljq"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id5bwzqhgw-YqVj-1qgi-Nfym-KKbFIlp0Qo4C",
                  "tag": "div",
                  "classes": [
                      "contact-page"
                  ],
                  "data": {},
                  "children": [
                      "idsRj6FbA5-lgh9-0JhK-wCUA-gAV8H43R5dtf",
                      "idG64iYiZF-AIVm-3ZfB-zi6P-5BdiMGEiFgN5"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idZO8zpSUQ-wyzm-3TaU-I0kG-by5jnMz7T3LX",
                  "text": true,
                  "v": "Full Name:"
              },
              {
                  "_id": "idFP5Mbd3Z-r82T-qalJ-Ak87-46CDxEcg7ILm",
                  "tag": "label",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idZO8zpSUQ-wyzm-3TaU-I0kG-by5jnMz7T3LX"
                  ],
                  "type": "Label"
              },
              {
                  "_id": "idkA9ko1Bo-rTWO-JRSw-t7iI-FhtCtxzPfY8m",
                  "tag": "input",
                  "classes": [],
                  "data": {
                      "type": "text",
                      "name": "fullName",
                      "required": ""
                  },
                  "children": [],
                  "type": "Input"
              },
              {
                  "_id": "id60FR8DJd-lHRv-Vyix-AeUk-KzbCjrhwaouS",
                  "text": true,
                  "v": "Email:"
              },
              {
                  "_id": "idVp2k9Wau-hVVe-8sbW-h3vb-BCiBcfgDaOVT",
                  "tag": "label",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id60FR8DJd-lHRv-Vyix-AeUk-KzbCjrhwaouS"
                  ],
                  "type": "Label"
              },
              {
                  "_id": "idi8awh4bm-YhAZ-Kn3D-P0Nu-GpMJJn4Tmlvj",
                  "tag": "input",
                  "classes": [],
                  "data": {
                      "type": "email",
                      "name": "email",
                      "required": ""
                  },
                  "children": [],
                  "type": "Input"
              },
              {
                  "_id": "idpCxqEExI-aSjB-9K1u-03r4-jBB4ReryLoHR",
                  "text": true,
                  "v": "Tell me about your project:"
              },
              {
                  "_id": "idlwbnHy1Q-mw7f-jJO3-Unbs-mmOVlurpM8y8",
                  "tag": "label",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idpCxqEExI-aSjB-9K1u-03r4-jBB4ReryLoHR"
                  ],
                  "type": "Label"
              },
              {
                  "_id": "idTBZFzusc-zjg1-jLit-Awu2-thQiSYZoDN1K",
                  "tag": "textarea",
                  "classes": [],
                  "data": {
                      "name": "projectInfo",
                      "required": ""
                  },
                  "children": [],
                  "type": "Text"
              },
              {
                  "_id": "idcVxSOb75-Go0O-gVOf-G8OO-Gp3zx7KkETXy",
                  "text": true,
                  "v": "Submit message"
              },
              {
                  "_id": "idN3L9XLCA-ElgZ-BWd1-3CeV-Iuvx42z2IBeR",
                  "tag": "button",
                  "classes": [],
                  "data": {
                      "type": "submit"
                  },
                  "children": [
                      "idcVxSOb75-Go0O-gVOf-G8OO-Gp3zx7KkETXy"
                  ],
                  "type": "Button"
              },
              {
                  "_id": "id5oYRFpGn-oepb-E25k-yGtq-rNIObK2en4Ye",
                  "tag": "form",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idFP5Mbd3Z-r82T-qalJ-Ak87-46CDxEcg7ILm",
                      "idkA9ko1Bo-rTWO-JRSw-t7iI-FhtCtxzPfY8m",
                      "idVp2k9Wau-hVVe-8sbW-h3vb-BCiBcfgDaOVT",
                      "idi8awh4bm-YhAZ-Kn3D-P0Nu-GpMJJn4Tmlvj",
                      "idlwbnHy1Q-mw7f-jJO3-Unbs-mmOVlurpM8y8",
                      "idTBZFzusc-zjg1-jLit-Awu2-thQiSYZoDN1K",
                      "idN3L9XLCA-ElgZ-BWd1-3CeV-Iuvx42z2IBeR"
                  ],
                  "type": "Form"
              },
              {
                  "_id": "idekEQjmKO-dKsV-kCj9-lj5l-DP0vZrP1XjZy",
                  "tag": "div",
                  "classes": [
                      "form_ctn"
                  ],
                  "data": {},
                  "children": [
                      "id5oYRFpGn-oepb-E25k-yGtq-rNIObK2en4Ye"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id9HAqjqmO-rgzF-NVQq-ZllY-ZdAhlSImZZM4",
                  "tag": "div",
                  "classes": [
                      "contact-area"
                  ],
                  "data": {},
                  "children": [
                      "id5bwzqhgw-YqVj-1qgi-Nfym-KKbFIlp0Qo4C",
                      "idekEQjmKO-dKsV-kCj9-lj5l-DP0vZrP1XjZy"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idraEHuBS6-ylZ7-IBhb-2NPU-TtqmChJthYgz",
                  "text": true,
                  "v": "Follow me"
              },
              {
                  "_id": "id2Cd3WAr2-TPQL-wjr7-xU93-zQAEcu2H5gx3",
                  "tag": "h3",
                  "classes": [
                      "follow-me"
                  ],
                  "data": {},
                  "children": [
                      "idraEHuBS6-ylZ7-IBhb-2NPU-TtqmChJthYgz"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idHSo6Aybj-J63T-F90u-om26-htYVajt5Tvlf",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709087810837-linkedin.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idDXtM2HxO-1Ee9-zBhH-T8IF-98iOHzfVgIrN",
                  "text": true,
                  "v": "Linkedin"
              },
              {
                  "_id": "idMbbCeI98-HUGE-oFjx-VEdD-zex8r2TMpFfi",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idDXtM2HxO-1Ee9-zBhH-T8IF-98iOHzfVgIrN"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idebxtJH7C-ANHN-NMhT-p0Lr-PVWaEz988rb7",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idHSo6Aybj-J63T-F90u-om26-htYVajt5Tvlf",
                      "idMbbCeI98-HUGE-oFjx-VEdD-zex8r2TMpFfi"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idtXLC7Gm3-25Zk-su3B-4HXG-JHfIIaVphTJW",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088090774-twitter.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idRvY7TNyR-mMTj-HM96-0sj3-uhu4lM4pO813",
                  "text": true,
                  "v": "Twitter"
              },
              {
                  "_id": "idXfuUcYon-g9UZ-aCkk-CiaP-NVCqK3IyFroy",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idRvY7TNyR-mMTj-HM96-0sj3-uhu4lM4pO813"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idxCACfmRB-kv9w-9ALA-JfLw-798YiRT38MPh",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idtXLC7Gm3-25Zk-su3B-4HXG-JHfIIaVphTJW",
                      "idXfuUcYon-g9UZ-aCkk-CiaP-NVCqK3IyFroy"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idL9TzZSLG-aKHB-k6EJ-tpRf-JYe3uvOs3wpo",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088195528-instagram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id2LOfxpcF-hNRE-XBrV-e64d-19gdAJC7Av48",
                  "text": true,
                  "v": "Instagram"
              },
              {
                  "_id": "idhCrxevTC-6M7f-RkUX-hfTm-zF7XjVIywgTj",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id2LOfxpcF-hNRE-XBrV-e64d-19gdAJC7Av48"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idVxAUsgTN-s0nH-Ne86-7PVm-0q83CO6lGAaG",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idL9TzZSLG-aKHB-k6EJ-tpRf-JYe3uvOs3wpo",
                      "idhCrxevTC-6M7f-RkUX-hfTm-zF7XjVIywgTj"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id1V731Gp6-nRsA-zO0o-8Irs-32okl15n6vdr",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idebxtJH7C-ANHN-NMhT-p0Lr-PVWaEz988rb7",
                      "idxCACfmRB-kv9w-9ALA-JfLw-798YiRT38MPh",
                      "idVxAUsgTN-s0nH-Ne86-7PVm-0q83CO6lGAaG"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idIPDco4Oh-Riop-cONw-OyJl-jTZM9lTM0evx",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088362442-Facebook.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idHNzp5KE7-OTML-N67v-CWeV-q5NHtEAJhO51",
                  "text": true,
                  "v": "Facebook"
              },
              {
                  "_id": "idFEZpldbm-DZmj-O4Kp-pxoW-HYOaYxYUkRXU",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idHNzp5KE7-OTML-N67v-CWeV-q5NHtEAJhO51"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "id09m91siG-iqlc-Fr6n-jrNq-LdpAiu6l2EDV",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idIPDco4Oh-Riop-cONw-OyJl-jTZM9lTM0evx",
                      "idFEZpldbm-DZmj-O4Kp-pxoW-HYOaYxYUkRXU"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idkGHZMbas-0FKX-M7VC-qbVN-ppc9mnfnETrq",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088546423-youtube.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idNpocTIUp-j4ZQ-WSTA-xVhz-R0bAcgFcM3jw",
                  "text": true,
                  "v": "Youtube"
              },
              {
                  "_id": "id1lmNJYnR-sNSE-crGk-K92H-Q914sWkWfvDU",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idNpocTIUp-j4ZQ-WSTA-xVhz-R0bAcgFcM3jw"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idRVGBmhNb-nCFq-Wadw-7LZF-QXEFrOpaezeX",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idkGHZMbas-0FKX-M7VC-qbVN-ppc9mnfnETrq",
                      "id1lmNJYnR-sNSE-crGk-K92H-Q914sWkWfvDU"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idILTZUpIN-3v4T-K3Bp-aHwH-PoL11xIin7l7",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709088617221-dribbble.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idqwgPSzeR-X4DG-v0mx-ONUv-vHiG0OCKbSPb",
                  "text": true,
                  "v": "Dribble"
              },
              {
                  "_id": "idgAIXIj1H-yoOE-eFHS-sCyv-AAWlDdq0KzaD",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idqwgPSzeR-X4DG-v0mx-ONUv-vHiG0OCKbSPb"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idPqYJJOJL-HQ0E-rmpE-Ab5Y-dLFx7LFmbQJ9",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idILTZUpIN-3v4T-K3Bp-aHwH-PoL11xIin7l7",
                      "idgAIXIj1H-yoOE-eFHS-sCyv-AAWlDdq0KzaD"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "id7Qtcl0rG-QlAE-ZwAN-wpeH-a5Ea1vQPenpH",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id09m91siG-iqlc-Fr6n-jrNq-LdpAiu6l2EDV",
                      "idRVGBmhNb-nCFq-Wadw-7LZF-QXEFrOpaezeX",
                      "idPqYJJOJL-HQ0E-rmpE-Ab5Y-dLFx7LFmbQJ9"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idCLFIzsTd-4vxG-lgo2-dfK0-KfWbJql9WrCn",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089122414-telegram.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idlfY5YdCn-Ab56-j83N-hVYj-JPjLLjDZbaG9",
                  "text": true,
                  "v": "Telegram"
              },
              {
                  "_id": "idtBAUdFkn-Y4db-z3Tb-dkbk-MCfR8HrJKfuJ",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idlfY5YdCn-Ab56-j83N-hVYj-JPjLLjDZbaG9"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idi7N5vOKO-IFdd-mM6C-kOx5-si64wembjLcs",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idCLFIzsTd-4vxG-lgo2-dfK0-KfWbJql9WrCn",
                      "idtBAUdFkn-Y4db-z3Tb-dkbk-MCfR8HrJKfuJ"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idThh7QTjN-26CG-K6FG-BfrU-D2JCJo1tXsFK",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089177123-whatsapp.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "idr6Keaf4j-kKvI-3sp5-4hgs-1vOzclNToDeV",
                  "text": true,
                  "v": "Whatsapp"
              },
              {
                  "_id": "idfcpebViX-8ECQ-kdYK-gKld-7XasK1ZzMGEf",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idr6Keaf4j-kKvI-3sp5-4hgs-1vOzclNToDeV"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idah0EHMFr-GsNG-ehj8-bbb6-OMSYPySBQeQ3",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idThh7QTjN-26CG-K6FG-BfrU-D2JCJo1tXsFK",
                      "idfcpebViX-8ECQ-kdYK-gKld-7XasK1ZzMGEf"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idEZXqkqCd-xTka-dcJ6-HlM2-61KexcntvfSN",
                  "tag": "img",
                  "classes": [
                      "icon"
                  ],
                  "data": {
                      "src": "https://cwm.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/tailordom/1709089232947-behance.png"
                  },
                  "children": [],
                  "type": "Image"
              },
              {
                  "_id": "id2C5DWPIW-F2kU-Scdr-EmZr-LqSSJ4NoFPas",
                  "text": true,
                  "v": "Behance"
              },
              {
                  "_id": "id3cCNcO9y-DC2A-onxv-atRB-3Tg7SzbTT2Zh",
                  "tag": "h5",
                  "classes": [],
                  "data": {},
                  "children": [
                      "id2C5DWPIW-F2kU-Scdr-EmZr-LqSSJ4NoFPas"
                  ],
                  "type": "Heading 5"
              },
              {
                  "_id": "idhassje9Z-9822-2c9G-3cHj-I03Ti5TmpAJh",
                  "tag": "div",
                  "classes": [
                      "icon-list"
                  ],
                  "data": {},
                  "children": [
                      "idEZXqkqCd-xTka-dcJ6-HlM2-61KexcntvfSN",
                      "id3cCNcO9y-DC2A-onxv-atRB-3Tg7SzbTT2Zh"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idr0JYEGfZ-sxG3-sF2A-NDxv-Rkth9vQH8n1x",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idi7N5vOKO-IFdd-mM6C-kOx5-si64wembjLcs",
                      "idah0EHMFr-GsNG-ehj8-bbb6-OMSYPySBQeQ3",
                      "idhassje9Z-9822-2c9G-3cHj-I03Ti5TmpAJh"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idEe77EbQ4-VEB8-9KRK-ip2Z-yTyVY5SKt45L",
                  "tag": "div",
                  "classes": [
                      "follow"
                  ],
                  "data": {},
                  "children": [
                      "id2Cd3WAr2-TPQL-wjr7-xU93-zQAEcu2H5gx3",
                      "id1V731Gp6-nRsA-zO0o-8Irs-32okl15n6vdr",
                      "id7Qtcl0rG-QlAE-ZwAN-wpeH-a5Ea1vQPenpH",
                      "idr0JYEGfZ-sxG3-sF2A-NDxv-Rkth9vQH8n1x"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idnvdeLvLq-tLoK-Wjcm-QEc8-QN10KPcs6I3Y",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idEe77EbQ4-VEB8-9KRK-ip2Z-yTyVY5SKt45L"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idqU01ocLs-5Fw3-eanD-u6KS-coe53m8iFwlF",
                  "text": true,
                  "v": "Tailorflow"
              },
              {
                  "_id": "idGiTpN0Fb-5qh5-95y1-58K4-smrbwgY8W9GI",
                  "tag": "h3",
                  "classes": [
                      "tailorflow"
                  ],
                  "data": {},
                  "children": [
                      "idqU01ocLs-5Fw3-eanD-u6KS-coe53m8iFwlF"
                  ],
                  "type": "Heading 3"
              },
              {
                  "_id": "idTXkbEo0l-uoSO-Gy7I-AmTe-nXt9d8m85UEt",
                  "text": true,
                  "v": "I'm Akin Matthews, a designer passionate about creating"
              },
              {
                  "_id": "idJBYjolSv-ANcp-K5LJ-dn2Y-rj42tgsue10L",
                  "tag": "br",
                  "classes": [],
                  "data": {},
                  "children": [],
                  "type": "Line break"
              },
              {
                  "_id": "idOC6siySE-coTz-Xmxq-YJhy-6WEjG5bWxbP4",
                  "text": true,
                  "v": "beautiful, usable and accessible designs for individuals."
              },
              {
                  "_id": "idoQEUa6eQ-6UsR-s7SA-dFkw-CVT5fEyBHWNK",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idTXkbEo0l-uoSO-Gy7I-AmTe-nXt9d8m85UEt",
                      "idJBYjolSv-ANcp-K5LJ-dn2Y-rj42tgsue10L",
                      "idOC6siySE-coTz-Xmxq-YJhy-6WEjG5bWxbP4"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "id4hN8oUkK-Y3n6-va5Q-d0pt-NdjZtuhKDJ2m",
                  "tag": "div",
                  "classes": [
                      "footer-up"
                  ],
                  "data": {},
                  "children": [
                      "idGiTpN0Fb-5qh5-95y1-58K4-smrbwgY8W9GI",
                      "idoQEUa6eQ-6UsR-s7SA-dFkw-CVT5fEyBHWNK"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idjiVqmIm2-4FFj-J056-kqhx-H8VHbMCFtfD7",
                  "text": true,
                  "v": "Product"
              },
              {
                  "_id": "idr6JfY1lW-1Cnd-XpVF-C21l-2YDyY21QHQEj",
                  "tag": "h4",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idjiVqmIm2-4FFj-J056-kqhx-H8VHbMCFtfD7"
                  ],
                  "type": "Heading 4"
              },
              {
                  "_id": "idgj6G64lO-6MUC-by1J-EG6D-2YwpS5uaLPtF",
                  "text": true,
                  "v": "About"
              },
              {
                  "_id": "idHHaNFcSQ-z70P-f0UQ-aVxk-wE8DaeFAXOMU",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idgj6G64lO-6MUC-by1J-EG6D-2YwpS5uaLPtF"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idC13getQZ-hAvZ-pv1i-knuO-cOC8rAmjG2Ja",
                  "text": true,
                  "v": "Portfolio"
              },
              {
                  "_id": "idRUWjuvTU-Ji88-DQBX-2bFu-I9dKQvnRvt0v",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idC13getQZ-hAvZ-pv1i-knuO-cOC8rAmjG2Ja"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idZswku7xD-GHm4-lB9f-KoS8-msSDT7agRjwH",
                  "text": true,
                  "v": "Contact"
              },
              {
                  "_id": "idhyqjaQ7D-Ca3d-EtyL-Mp2Z-DAdB1Ip20tO1",
                  "tag": "p",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idZswku7xD-GHm4-lB9f-KoS8-msSDT7agRjwH"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idvhYyHAfP-jZJa-FPan-cVdr-duLP9K3JYLrh",
                  "tag": "div",
                  "classes": [
                      "footer-down"
                  ],
                  "data": {},
                  "children": [
                      "idr6JfY1lW-1Cnd-XpVF-C21l-2YDyY21QHQEj",
                      "idHHaNFcSQ-z70P-f0UQ-aVxk-wE8DaeFAXOMU",
                      "idRUWjuvTU-Ji88-DQBX-2bFu-I9dKQvnRvt0v",
                      "idhyqjaQ7D-Ca3d-EtyL-Mp2Z-DAdB1Ip20tO1"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idy65vOW9A-xUfI-6BJJ-uGXI-9vS20r1fiHGC",
                  "tag": "div",
                  "classes": [
                      "footer"
                  ],
                  "data": {},
                  "children": [
                      "id4hN8oUkK-Y3n6-va5Q-d0pt-NdjZtuhKDJ2m",
                      "idvhYyHAfP-jZJa-FPan-cVdr-duLP9K3JYLrh"
                  ],
                  "type": "Container"
              },
              {
                  "_id": "idHcBxVmvk-Axul-3jXp-uRgx-J8tbdwZdIKf0",
                  "text": true,
                  "v": "Copyright © Tailorflow"
              },
              {
                  "_id": "idJEkvkDDD-OjY4-C8kL-paEk-ArYBE5OVEaf9",
                  "tag": "p",
                  "classes": [
                      "copy-right"
                  ],
                  "data": {},
                  "children": [
                      "idHcBxVmvk-Axul-3jXp-uRgx-J8tbdwZdIKf0"
                  ],
                  "type": "Paragraph"
              },
              {
                  "_id": "idrpJAQg5d-Y1t1-Vnx0-DCpi-XrM9ajDtrSnk",
                  "tag": "div",
                  "classes": [],
                  "data": {},
                  "children": [
                      "idy65vOW9A-xUfI-6BJJ-uGXI-9vS20r1fiHGC",
                      "idJEkvkDDD-OjY4-C8kL-paEk-ArYBE5OVEaf9"
                  ],
                  "type": "Container"
              }
              ],
            "styles":{
              "data": {
                  "appliedStylesMap": {},
                  "breakpoints": {
                  }, 
                  "macros": [], "migrations": {"stylesNext": true}, "swatches": []
              },
              "style":[
                  {
                      "style_id": "9377e4d2-0ee5-4f85-bc1d-c86d20bbb31f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "*, ::before, ::after",
                          "sel": "*, ::before, ::after",
                          "styleLess": "box-sizing: border-box;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "05c6e9c1-861e-4e3a-a86c-67515b786ec8",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "html, body",
                          "sel": "html, body",
                          "styleLess": "font-family: inter; height: 100%; padding: 0px; max-width: 1300px; margin: auto;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "5656e158-d330-4ade-9998-af7354faf72a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "body",
                          "sel": "body",
                          "styleLess": "line-height: 1.5; -webkit-font-smoothing: antialiased; font-family: Poppins, sans-serif;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "0f89af89-2564-4711-989d-0541eb651170",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "img",
                          "sel": "img",
                          "styleLess": "display: block;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a2080826-8b8b-4818-8ce0-18d70a2f631f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "ul",
                          "sel": "ul",
                          "styleLess": "list-style: none; padding: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "0ce22620-4f14-4487-8eb7-838aee3684f1",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "a",
                          "sel": "a",
                          "styleLess": "text-decoration: none; color: black;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "fc4357f3-2821-46a7-b2ff-698872925189",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "p, h1, h2, h3, h4, h5, h6",
                          "sel": "p, h1, h2, h3, h4, h5, h6",
                          "styleLess": "overflow-wrap: break-word; margin: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a3bb2a65-92c1-4b03-9096-7cb0fa03126b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "#contactmain",
                          "sel": "#contactmain",
                          "styleLess": "padding: 2em 0.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "d722233a-3b2c-48bb-b214-ff398b4ca091",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".note",
                          "styleLess": "line-height: 25px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "0b53bf4a-9f60-493b-af3e-17556d3a0660",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header",
                          "styleLess": "display: flex; justify-content: space-between; gap: 10px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7d3e32e2-7724-403b-aae1-58d32685347f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "hr",
                          "sel": "hr",
                          "styleLess": "margin: 2em 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "1043b93e-fab3-4dcf-9988-cf6b13a89657",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header",
                          "styleLess": "display: flex; justify-content: space-between; align-items: center; gap: 10px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "9d359292-851f-40e2-82be-93662b237cf6",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".menu-icon",
                          "styleLess": "width: 40px; height: 40px;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: block;"
                              },
                              "medium": {
                                  "sel": ".menu-icon",
                                  "styleLess": "display: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "733ec447-36b4-451a-9081-cc9d578bfc3a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".tailorflow",
                          "styleLess": "text-decoration: none; font-weight: 600; font-size: 25px; color: rgb(0, 52, 53);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "a6d3c830-cc9b-4209-b417-137f25a2f568",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".header-list",
                          "styleLess": "display: none;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-list",
                                  "styleLess": "display: none;"
                              },
                              "medium": {
                                  "sel": ".header-list",
                                  "styleLess": "display: flex; padding: 0px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "d7b6a8d7-d96f-4766-9b2d-c702a49d88b3",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".get-in-touch",
                          "styleLess": "font-size: 2.4em; padding-top: 20px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "df0c3f3c-9a36-4367-86ef-badbe0c2de2e",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".working-page > p",
                          "styleLess": "margin: 1em 0px;",
                          "type": "class",
                          "variants": {
                              "tiny": {
                                  "sel": ".working-page > p",
                                  "styleLess": "width: 97%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "88c88e61-f6ca-4cd9-aa06-4e56492074a5",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow",
                          "styleLess": "display: flex; gap: 3px; width: 105px; font-size: 1.2em; align-items: center; justify-content: space-between;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".arrow",
                                  "styleLess": "width: 120px;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "a6414b27-8440-4a41-a8da-5acc01b96687",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".arrow-image",
                          "styleLess": "width: 30px; height: 30px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "d0a23588-0c31-4df5-b1b0-f4eb41c99393",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".contacts-icon",
                          "styleLess": "display: flex; flex-wrap: wrap; justify-content: space-around; align-items: flex-start; gap: 26px;",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".contacts-icon",
                                  "styleLess": "width: 70%; justify-content: left; margin-top: 1.5em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "7607c9df-6e26-43d9-b39c-f824215c4110",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".form_ctn",
                          "styleLess": "width: 95%;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".form_ctn",
                                  "styleLess": "width: 70%; margin: auto;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "1b3e6de0-83b4-445e-81e9-50a4cdf6ee23",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "form",
                          "sel": "form",
                          "styleLess": "background-color: rgb(255, 255, 255); padding: 0px; border-radius: 8px; color: rgb(5, 20, 36); display: flex; flex-direction: column; margin: 80px 0px; width: 100%;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "69fa3ba8-d106-46b1-af50-01da6ffc96d4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "label",
                          "sel": "label",
                          "styleLess": "margin-bottom: 0px;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "bac2c31f-4edc-44b8-8f4e-5642e50d6bc0",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "input, textarea",
                          "sel": "input, textarea",
                          "styleLess": "padding: 8px; margin-bottom: 10px; box-sizing: border-box; border-top: none; border-right: none; border-left: none; border-image: initial; border-bottom: 1px solid rgb(204, 204, 204); outline: none;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4a8ecd7f-53f7-45d7-999f-ec5a1935b4cd",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "button",
                          "sel": "button",
                          "styleLess": "background-color: black; color: rgb(255, 255, 255); padding: 10px; border: none; border-radius: 4px; cursor: pointer; width: 140px; margin-top: 1.3em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4f67044b-9ab2-4124-aae9-d7d38e6c21b8",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em; margin-bottom: 2em;",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow",
                                  "styleLess": "margin: 5em 0px; gap: 1em;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "bdb02e56-5f5e-4976-adb3-0e229aa97b18",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".follow-me",
                          "styleLess": "font-size: 1.5em; letter-spacing: 0.05em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "c51f5886-cb7f-4357-8d42-132deeeb6c29",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".icon-list",
                          "styleLess": "display: flex; align-items: center; gap: 0.5em; margin-bottom: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "4cb60613-e135-4aa0-b13a-15442f5c203f",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer",
                          "styleLess": "display: flex; flex-direction: column; gap: 1.8em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "7bad12ef-7334-4914-b307-2b759031ba2b",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".footer-up, .footer-down",
                          "styleLess": "display: flex; flex-direction: column; gap: 1em; font-size: 1em;",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "36070aad-3eac-4235-9167-ca28ca756fef",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "",
                          "sel": ".copy-right",
                          "styleLess": "margin-top: 1.5em; font-size: 0.9em; color: rgb(52, 64, 84);",
                          "type": "class",
                          "variants": {}
                      }
                  },
                  {
                      "style_id": "c8d62635-8f0c-4dd8-8072-3e31f7851454",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".header-icons",
                          "sel": ".header-icons",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              },
                              "medium": {
                                  "sel": ".header-icons",
                                  "styleLess": "text-decoration: none; color: rgb(29, 41, 57);"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "abd0fa0a-9db4-452b-b49f-f1935b25959a",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": "li",
                          "sel": "li",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              },
                              "medium": {
                                  "sel": "li",
                                  "styleLess": "list-style: none;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "559cc04c-0e4d-4a18-88b1-b357dea29b83",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".contact-page",
                          "sel": ".contact-page",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".contact-page",
                                  "styleLess": "margin: auto; width: 70%; text-align: center;"
                              },
                              "medium": {
                                  "sel": ".contact-page",
                                  "styleLess": "text-align: left;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "daf9629e-b67f-4df3-b2c0-b94f81581ae4",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".follow, .footer",
                          "sel": ".follow, .footer",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".follow, .footer",
                                  "styleLess": "display: flex; flex-direction: row; align-items: center; justify-content: space-between;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "b46a9032-b7cc-49e2-bdd6-1c4ed4996d5d",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".footer-down",
                          "sel": ".footer-down",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "small": {
                                  "sel": ".footer-down",
                                  "styleLess": "width: 40%;"
                              }
                          }
                      }
                  },
                  {
                      "style_id": "df4da924-4afd-45c6-9a76-062773a79681",
                      "data": {
                          "comb": "",
                          "affects": {},
                          "children": [],
                          "name": ".contact-area",
                          "sel": ".contact-area",
                          "styleLess": "",
                          "type": "class",
                          "variants": {
                              "medium": {
                                  "sel": ".contact-area",
                                  "styleLess": "display: flex; gap: 15%; justify-content: space-around;"
                              }
                          }
                      }
                  }
              ]
            }
        }
    ]
}











