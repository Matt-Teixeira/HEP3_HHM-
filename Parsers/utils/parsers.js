const win_7_re = {
  big_group:
    /(?<big_group>Source.*[\r\n]Domain:.*[\r\n]Type:.*[\r\n]ID:.*[\r\n]Date:.*[\r\n]Text:.*)\n?/g,
  small_group:
    /Source:(?<source_group>.*)[\r\n]Domain:(?<domain_group>.*)[\r\n]Type:(?<type_group>.*)[\r\n]ID:(?<id_group>.*)[\r\n](Date:.*\s(?<month>\w+)\s(?<day>\d+),\s(?<year>\d+),\s(?<host_time>.*))[\r\n]Text:(?<text_group>.*)\n?/,
};

const win_10_re = {
  re_v1:
    /(?<host_state>\w+)\t(?<host_date>\d{4}-\d{1,2}-\d{1,2})\t(?<host_time>\d{2}:\d{2}:\d{2})\t(?<source_group>(.*?(\d+)?)(\.\d\.\d)?)\t?\s?(?<type_group>(\d{1,5}))\t(?<text_group>.*)/,
};

const ge_re = {
  gesys_mroc: {
    block:
      /(?<block>SR(.+)((\r?\n.+)*)[\r\n]+(.+)((\r?\n.+)*)[\n\r]+EN\s\d+)/g, // SR\s(\d+).*?EN\s\1
    no_box:
      /SR\s(?<sr_group>\d+)[\n\r](?<time_stamp>\d+)\s+(?<num_1>\d+)\s+(?<num_2>\d+)\s+\w+\s(?<month>\w+)\s+(?<day>\d+)\s(?<host_time>\d{1,2}:\d{1,2}:\d{1,2})\s(?<year>\d+)\s+(?<num_3>(-)?\d+)\s(?<num_4>(-)?\d+)\s+mroc\s(?<mroc>.*)[\n\r](?<data_1>.*?)\s+(?<num_5>\d+)[\n\r]\s(?<data_2>(.+)((\r?\n.+)*))[\n\r]\s?EN\s(?<en>\d+)/,
    box:
      /SR\s(?<sr_group>\d+).*\s+(?<time_stamp>\d+)\s+(?<num_1>\d+)\s+(?<num_2>\d+)\s+\w+\s(?<month>\w+)\s+(?<day>\d+)\s(?<host_time>\d{1,2}:\d{1,2}:\d{1,2})\s(?<year>\d+)\s+(?<num_3>\d+)\s(?<num_4>\d+)\s+mroc\s(?<mroc>.*)\s+(?<data_1>.*?)\s+(?<num_5>\d+)\s+Server\sName:\s(?<server_name>\w+)\s+\s+(?<data_2>.*)\s+EN\s(?<en>.*)/,
    exception_class:
      /SR\s(?<sr_group>\d+)[\n\r](?<time_stamp>\d+)\s+(?<num_1>\d+)\s+(?<num_2>\d+)\s+\w+\s(?<month>\w+)\s+(?<day>\d+)\s(?<host_time>\d{1,2}:\d{1,2}:\d{1,2})\s(?<year>\d+)\s+(?<num_3>\d+)\s(?<num_4>\d+)\s+mroc\s(?<mroc>.*)[\n\r](?<data_1>.*?)\s+(?<num_5>\d+)[\n\r]\sException\sClass:\s(?<exception_class>(.+)((\r?\n.+)*))[\n\r]\sEN\s(?<en>\d+)/,
    task_id:
      /SR\s(?<sr_group>\d+)[\n\r](?<time_stamp>\d+)\s+(?<num_1>\d+)\s+(?<num_2>\d+)\s+\w+\s(?<month>\w+)\s+(?<day>\d+)\s(?<host_time>\d{1,2}:\d{1,2}:\d{1,2})\s(?<year>\d+)\s+(?<num_3>\d+)\s(?<num_4>\d+)\s+mroc\s(?<mroc>.*)[\n\r](?<data_1>.*?)\s+(?<num_5>\d+)[\n\r]\sTask\sID:\s(?<task_id>.*?)\s+Time:\s(?<time_2>\d+)\s+Object:\s(?<object>.*)[\n\r]Exception\sClass:\s(?<exception_class>(.+)((\r?\n.+)*))[\n\r]\sEN\s(?<en>\d+)/,
    test: {
      for_box: //,
      for_exception_class: /Exception\sClass:/,
      for_task_id: /Task\sID:/,
    },
  },
};

const philips = {};

module.exports = {
  win_7_re,
  win_10_re,
  ge_re,
};