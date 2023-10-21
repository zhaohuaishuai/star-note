import StarNote from "./main"
const starNote = new StarNote({x:100,y:100})
const as = {
    "id": 5,
    "name": "",
    "templateId": 149,
    "advertiserIdList": [
      "1774465345162247",
      "1774465345776648",
      "1767396488101000"
    ],
    "aa":{
        "aa-name": "days",
        "aa-el": "eq",
        "aa-value": 30,
        "aa-relation": ""
      },
    "newsCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      }
    ],
    "news": 3,
    "topNCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      },
      {
        "name": "stat_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cnt",
        "el": "eq",
        "value": 5,
        "relation": ""
      }
    ],
    "closeCondition": [
      {
        "name": "stat_cost",
        "el": "",
        "value": 7,
        "relation": "or"
      },
      {
        "name": "click_cnt",
        "el": "",
        "value": 2,
        "relation": ""
      },
      {
        "name": "convert_cnt",
        "el": "",
        "value": 2,
        "relation": "and"
      }
    ],
    "topN": 3,
    "newsDeliveryTime": "06:06",
    "topNDeliveryTime": "01:01",
    "checkFrequency": 4
  }


  const as2 = {
    "id": 5,
    "name": "",
    "templateId": 149,
    "advertiserIdList": [
      "1774465345162247",
      "1774465345776648"
    ],
    "aa":{
        "aa-name": "days11",
        "aa-el": "eq",
        "aa-value": 30,
        "aa-relation": ""
      },
    "newsCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      }
    ],
    "news": 3,
    "topNCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      },
      {
        "name": "stat_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cnt",
        "el": "eq",
        "value": 5,
        "relation": ""
      }
    ],
    "closeCondition": [
      {
        "name": "stat_cost",
        "el": "",
        "value": 7,
        "relation": "or"
      },
      {
        "name": "click_cnt",
        "el": "",
        "value": 2,
        "relation": ""
      },
      {
        "name": "convert_cnt",
        "el": "",
        "value": 2,
        "relation": "and"
      }
    ],
    "topN": 3,
    "newsDeliveryTime": "06:06",
    "topNDeliveryTime": "01:01",
    "checkFrequency": 4
  }
starNote.update(as)


document.querySelector('#upBtn').onclick =()=>{
    as.topNCondition[2].value = 300
    starNote.update(as)
}


document.querySelector('#upBtn1').onclick =()=>{
   
    starNote.update({a:1,b:2})
}



document.querySelector('#upBtn2').onclick =()=>{

    as.topNCondition[2].value = 1300
    as.topN = 300000
   
    starNote.update(as)
}



document.querySelector('#upBtn3').onclick =()=>{
    as.advertiserIdList.splice(1,0,'1774465345162248')
   
    starNote.update(as)
}

document.querySelector("#upBtn4")?.addEventListener('click',()=>{
  as.advertiserIdList.splice(0,1)
  starNote.update(as)
})

document.querySelector("#upBtn5")?.addEventListener('click',()=>{
   as.aa["aa-value1"] = 999999
   starNote.update(as)

})

document.querySelector("#upBtn6")?.addEventListener('click',()=>{
  delete as.aa["aa-value"]
  starNote.update(as)

})