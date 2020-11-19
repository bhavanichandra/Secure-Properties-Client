const prompts = require("prompts");

const questions = [
	{
		type: "text",
		name: "pathToJarFile",
		message: "Enter Full Path to Secure Properties Jar file: "
	},
	{
		type: "text",
		name: "typeOfInput",
		message: "Enter type of input (file or string): "
	},
	{
		type: "text",
		name: "operation",
		message: "Enter type of operation (encrypt or decrypt): "
	},
	{
		type: "text",
		name: "alg",
		message: "Enter algoritm (AES or Blowfish): "
	},
	{
		type: "text",
		name: "mode",
		message: "Enter mode (CBC, CFB, ECB, OFB): "
	},
	{
		type: "text",
		name: "key",
		message: "Enter any 16 characters long encryption key: "
	},
	{
		type: "text",
		name: "value",
		message: "Enter encrypted or decrypted value: "
	},
	{
		type: "text",
		name: "inputFile",
		message: "Enter file to encrypt/decrypt: ",
		default: " "
	},
	{
		type: "text",
		name: "outputFile",
		message: "Enter output file: ",
		default: " "
	}
];

const userInputFunction = async () => {
	const response = await prompts(questions);
	return response;
};

const secureString = (jarfile, op, alg, mode, key, value) => {
	const exec = require("child_process").exec;
	const command = `java -cp ${jarfile}r com.mulesoft.tools.SecurePropertiesTool string ${op} ${alg} ${mode} ${key} ${value}`;
	console.log("command: ", command);
	exec(command, (error, stdout, stderr) => {
		if (stderr) {
			console.log("Standard Error: " + stderr);
		}
		if (error) {
			console.log("Execution Error: " + error);
		}
		console.log(`Encrypted Sucessfully. Encrypted String Value: ${stdout} `);
	});
};

const secureFile = (jarfile, op, alg, mode, key, inputFile, outputFile) => {
	const exec = require("child_process").exec;
	const command = `java -cp ${jarfile} com.mulesoft.tools.SecurePropertiesTool file ${op} ${alg} ${mode} ${key} ${inputFile} ${outputFile}`;
	exec(command, (error, stdout, stderr) => {
		if (stderr) {
			console.log("Standard Error: " + stderr);
			return;
		}
		if (error) {
			console.log("Execution Error: " + error);
			return;
		}
		console.log("Encrypted Sucessfully");
	});
};

userInputFunction().then((resp) => {
	if (resp.typeOfInput === "string") {
		secureString(
			resp.pathToJarFile,
			resp.operation,
			resp.alg,
			resp.mode,
			resp.key,
			resp.value
		);
	} else if (resp.typeOfInput === "file") {
		secureFile(
			resp.pathToJarFile,
			resp.operation,
			resp.alg,
			resp.mode,
			resp.key,
			resp.inputFile,
			resp.outputFile
		);
	} else {
		console.log("Invalid Entry");
	}
});
