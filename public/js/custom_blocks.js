Blockly.defineBlocksWithJsonArray([
  {
    "type": "pycode",
    "tooltip": "",
    "helpUrl": "",
    "message0": "code snippet %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "CODE",
        "text": "print(\"hello\")"
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225
  },
  {
  "type": "pytrue",
  "tooltip": "",
  "helpUrl": "",
  "message0": "true %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 60
  },
  {
  "type": "pyfalse",
  "tooltip": "",
  "helpUrl": "",
  "message0": "false %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 60
  }
                    
]);

python.pythonGenerator.forBlock['pycode'] = function(block) {
  // Get the text from the field_input
  const text_code = block.getFieldValue('CODE');

  // Simply return the code as-is, followed by a newline
  return text_code + '\n';
};
python.pythonGenerator.forBlock['pytrue'] = function() {

  // TODO: Assemble python into the code variable.
  const code = 'True';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
};
python.pythonGenerator.forBlock['pyfalse'] = function() {

  // TODO: Assemble python into the code variable.
  const code = 'False';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
};
