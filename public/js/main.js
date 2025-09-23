document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize Blockly workspace
        const blocklyDiv = document.getElementById('blocklyDiv');
        if (!blocklyDiv) {
            throw new Error('Blockly div not found');
        }

        // Load toolbox from JSON file
        const toolboxResponse = await fetch('toolbox.json');
        if (!toolboxResponse.ok) {
            throw new Error('Failed to load toolbox');
        }
        const toolbox = await toolboxResponse.json();

        const workspace = Blockly.inject(blocklyDiv, {
            toolbox: toolbox,
            trashcan: true,
            scrollbars: true
        });

        // Initialize Pyodide
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });

        // Run button click handler
        const runButton = document.getElementById('runButton');
        if (runButton) {
            runButton.addEventListener('click', async () => {
                const outputDiv = document.getElementById('output');
                if (outputDiv) {
                    outputDiv.textContent = 'Running...';
                    
                    try {
                        // Generate Python code from Blockly
                        const code = Blockly.Python.workspaceToCode(workspace);
                        
                        // Execute Python code using Pyodide
                        // Capture Python's stdout
                        const stdout = pyodide.runPython(`
                            import sys
                            from io import StringIO
                            sys.stdout = StringIO()
                        `);
                        
                        await pyodide.runPythonAsync(code);
                        const output = pyodide.runPython('sys.stdout.getvalue()');
                        outputDiv.textContent = output;
                    } catch (error) {
                        outputDiv.textContent = `Error: ${error.message}`;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
});