const { getImportsConfig, getImportsCode } = require('./generate-import');
const { generateClassNameUnitCase } = require('./generate-class-name');
const prettier = require('prettier');
const prettierConfig = require('../config/prettier');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const { FRAMEWORK_MAP } = require('../config');

function generateVitestUnitCase(baseData, framework, { component }) {
  console.log(baseData);
  const importConfig = getImportsConfig(component);

  let tests = [];
  baseData[component].forEach((oneApiData) => {
    if (!oneApiData.test_description) return;
    const testDescription = parseJSON(oneApiData.test_description);
    if (!testDescription.PC || framework.indexOf('PC') === -1) return;
    // 存在 Web 框架的单测用例，再输出
    console.log(testDescription.PC);
    if (testDescription.PC.className) {
      const r = generateClassNameUnitCase(testDescription.PC, oneApiData, framework, component);
      if (r) {
        tests.push(r);
        tests.push('\n');
      }
    }
  });

  const importCodes = getImportsCode(importConfig, framework);

  tests = [`describe('${component} Component', () => {`].concat(tests).concat('});');

  try {
    const cases = [importCodes].concat(tests).join('\n\n');
    const str = prettier.format(cases, prettierConfig);
    console.log('>>>>>>>>', str, '>>>>>>');
    const basePath = FRAMEWORK_MAP[framework].apiBasePath;
    const fileName = kebabCase(component);
    const outputPath = path.resolve(basePath, `${fileName}/__tests__/vitest-${fileName}.test.jsx`);
    fs.writeFile(outputPath, str, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.green(`unit test cases file: ${outputPath} has been created.`));
    });
  } catch (e) {
    console.log(chalk.red('格式化失败，请检查生成的文件是否存在语法错误\n'));
    console.warn(e);
  }
}

function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
}

module.exports = {
  generateVitestUnitCase,
};
