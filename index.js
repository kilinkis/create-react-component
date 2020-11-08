#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const indexFileContent = (name) => {
  return `
  import React from 'react';
  import PropTypes from 'prop-types';

  import './style.scss';
  
  const ${name} = props => {
    return (
      <>
        
      </>
    );
  };
  
  ${name}.propTypes = {
    
  };
  
  export default ${name};
  `;
};

const basicFileContent = (name) => {
  return `
  import React from 'react';
  import ${name} from "./index";
  `;
};

program
  .version('0.1.0')
  .arguments('<componentName>')
  .description('test command', {
    componentName: 'command to run',
  })
  .action(function (componentName) {
    // console.log('command:', componentName || 'no Component name given');

    const dir = `./${componentName}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

      fs.writeFile(
        `./${componentName}/index.jsx`,
        indexFileContent(componentName),
        function (err) {
          if (err) throw err;
          console.log('index.jsx created successfully.');
        }
      );
      fs.writeFile(`./${componentName}/style.scss`, '', function (err) {
        if (err) throw err;
        console.log('index.jsx created successfully.');
      });
      fs.writeFile(
        `./${componentName}/${componentName}.stories.jsx`,
        basicFileContent(componentName),
        function (err) {
          if (err) throw err;
          console.log('Stories file created successfully.');
        }
      );
      fs.writeFile(
        `./${componentName}/${componentName}.spec.js`,
        basicFileContent(componentName),
        function (err) {
          if (err) throw err;
          console.log('Spec file created successfully.');
        }
      );
    } else {
      console.log('Directory already exist');
    }
  });

program.parse(process.argv);
