
export const as = {
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



export const ab = [
  {
      "id": 1,
      "type": 1,
      "status": 0,
      "name": "新建管控",
      "rule": "[{\"el\":\"gt\",\"name\":\"create_time_hour_range_1\",\"relation\":\"and\",\"value\":\"8\"},{\"el\":\"gt\",\"name\":\"stat_cost\",\"relation\":\"and\",\"value\":\"1\"},{\"el\":\"eq\",\"name\":\"show_cnt\",\"relation\":\"and\",\"value\":\"1\"},{\"el\":\"gt\",\"name\":\"convert_cnt\",\"relation\":\"and\",\"value\":\"1\"}]",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_hour_range_1",
              "el": "gt",
              "value": 8,
              "relation": "and"
          },
          {
              "name": "stat_cost",
              "el": "gt",
              "value": 1,
              "relation": "and"
          },
          {
              "name": "show_cnt",
              "el": "eq",
              "value": 1,
              "relation": "and"
          },
          {
              "name": "convert_cnt",
              "el": "gt",
              "value": 1,
              "relation": "and"
          }
      ],
      "condition1": [],
      "condition2": []
  },
  {
      "id": 2,
      "type": 2,
      "status": 1,
      "name": "低质量管控",
      "rule": "[{\"el\":\"gt\",\"name\":\"create_time_hour_range_1\",\"relation\":\"and\",\"value\":\"24\"},{\"el\":\"lt\",\"name\":\"stat_cost\",\"relation\":\"and\",\"value\":\"100\"},{\"el\":\"gt\",\"name\":\"convert_cost\",\"relation\":\"or\",\"value\":\"1\"},{\"el\":\"lt\",\"name\":\"stat_cost\",\"relation\":\"or\",\"value\":\"1\"},{\"el\":\"eq\",\"name\":\"convert_cnt\",\"relation\":\"and\",\"value\":\"0\"}]",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_hour_range_1",
              "el": "gt",
              "value": 24,
              "relation": "and"
          },
          {
              "name": "stat_cost",
              "el": "lt",
              "value": 100,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 1,
              "relation": "or"
          },
          {
              "name": "stat_cost",
              "el": "lt",
              "value": 1,
              "relation": "or"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 0,
              "relation": "and"
          }
      ],
      "condition1": [],
      "condition2": []
  },
  {
      "id": 3,
      "type": 3,
      "status": 0,
      "name": "空耗管控(当天)",
      "rule": "{\n\n\"condition\":[{\"el\":\"eq\",\"name\":\"create_time_current_day\",\"relation\":\"and\",\"value\":\"0\"},{\"el\":\"gt\",\"name\":\"stat_cost\",\"relation\":\"and\",\"value\":\"150\"},{\"el\":\"eq\",\"name\":\"convert_cnt\",\"relation\":\"and\",\"value\":\"0\"}],\"condition1\":[{\"el\":\"eq\",\"name\":\"create_time_days\",\"relation\":\"and\",\"value\":\"3\"},{\"el\":\"gt\",\"name\":\"convert_cost\",\"relation\":\"or\",\"value\":\"150\"},{\"el\":\"eq\",\"name\":\"convert_cnt\",\"relation\":\"or\",\"value\":\"0\"}]}",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_current_day",
              "el": "eq",
              "value": 0,
              "relation": "and"
          },
          {
              "name": "stat_cost",
              "el": "gt",
              "value": 155,
              "relation": "and"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 5,
              "relation": "and"
          }
      ],
      "condition1": [
          {
              "name": "create_time_days",
              "el": "eq",
              "value": 3,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 150,
              "relation": "or"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 2,
              "relation": "or"
          }
      ],
      "condition2": []
  },
  {
      "id": 4,
      "type": 4,
      "status": 0,
      "name": "空耗管控(近3天)",
      "rule": "[{\"el\":\"eq\",\"name\":\"create_time_days\",\"relation\":\"and\",\"value\":\"3\"},{\"el\":\"gt\",\"name\":\"convert_cost\",\"relation\":\"or\",\"value\":\"150\"},{\"el\":\"eq\",\"name\":\"convert_cnt\",\"relation\":\"or\",\"value\":\"0\"}]",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_days",
              "el": "eq",
              "value": 3,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 150,
              "relation": "or"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 0,
              "relation": "or"
          }
      ],
      "condition1": [],
      "condition2": []
  },
  {
      "id": 5,
      "type": 5,
      "status": 0,
      "name": "再开启管控",
      "rule": "[{\"el\": \"eq\",\"name\": \"create_time_current_day\",\"relation\": \"and\",\"value\": \"12\"}, {\"el\": \"lt\",\"name\": \"convert_cost\",\"relation\": \"and\",\"value\": \"150\"},{\"el\":\"eq\",\"name\":\"convert_cnt\",\"relation\":\"or\",\"value\":\"1\"}]",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_current_day",
              "el": "eq",
              "value": 12,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "lt",
              "value": 150,
              "relation": "and"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 1,
              "relation": "or"
          }
      ],
      "condition1": [],
      "condition2": []
  },
  {
      "id": 6,
      "type": 6,
      "status": 0,
      "name": "超成本管控",
      "rule": "{\n\n\"condition\":[{\"el\": \"eq\",\"name\": \"create_time_current_day\",\"relation\": \"and\",\"value\": \"1\"}, {\"el\": \"gt\",\"name\": \"convert_cost\",\"relation\": \"and\",\"value\": \"150\"}],\n\"condition1\":[{\"el\": \"eq\",\"name\": \"days\",\"relation\": \"and\",\"value\": \"3\"}, {\"el\": \"gt\",\"name\": \"convert_cost\",\"relation\": \"and\",\"value\": \"150\"},{\"el\": \"eq\",\"name\": \"convert_cnt\",\"relation\": \"and\",\"value\": \"0\"}],\n\"condition2\":[{\"el\": \"eq\",\"name\": \"days\",\"relation\": \"and\",\"value\": \"365\"}, {\"el\": \"gt\",\"name\": \"stat_cost\",\"relation\": \"and\",\"value\": \"150\"},{\"el\": \"gt\",\"name\": \"convert_cost\",\"relation\": \"and\",\"value\": \"180\"}, {\"el\": \"eq\",\"name\": \"convert_cnt\",\"relation\": \"and\",\"value\": \"0\"}]\n}",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [
          {
              "name": "create_time_current_day",
              "el": "eq",
              "value": 1,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 150,
              "relation": "and"
          }
      ],
      "condition1": [
          {
              "name": "days",
              "el": "eq",
              "value": 3,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 150,
              "relation": "and"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 0,
              "relation": "and"
          }
      ],
      "condition2": [
          {
              "name": "days",
              "el": "eq",
              "value": 365,
              "relation": "and"
          },
          {
              "name": "stat_cost",
              "el": "gt",
              "value": 150,
              "relation": "and"
          },
          {
              "name": "convert_cost",
              "el": "gt",
              "value": 180,
              "relation": "and"
          },
          {
              "name": "convert_cnt",
              "el": "eq",
              "value": 0,
              "relation": "and"
          }
      ]
  },
  {
      "id": 8,
      "type": 0,
      "status": 1,
      "name": "学习期管控",
      "rule": "[]",
      "orderSeq": 1,
      "page": 0,
      "page_size": 0,
      "condition": [],
      "condition1": [],
      "condition2": []
  }
]







 



