import {parse_container_list} from "./write_ead.js"

	

//


let uploadBox = null;
let uploadZone = null;
let toConvert = null;

// Set up listeners for the left-side navigation
document.querySelector('.test-btn').addEventListener('click', function() {console.log("HIT"); changeContent("guide_convert")});

function changeContent(page) {
	var contentDiv = document.getElementById('content');
	switch (page) {
		case 'guide_convert':
			// CAN YOU CHEAT AND ADD HTML FOR EVERYTHING ELSE
			document.getElementById("content").innerHTML = "";

			 // Create outer div
			const new_div = document.createElement("div");

			// Create form
			const new_form = document.createElement("form");
			new_form.setAttribute("class", "upload-wrapper");

			// Add heading and instructions
			const heading = document.createElement("h2");
			const heading_text = document.createTextNode("Upload Container List");
			heading.appendChild(heading_text);

			const instructions = document.createElement("p");
			const instruction_text = document.createTextNode("Click below or drag and drop CSV file to upload");
			instructions.appendChild(instruction_text);

			// Add upload div
			const upload_div = document.createElement("div");
			upload_div.setAttribute("class", "upload-zone");
			const sub_div = document.createElement("div");
			sub_div.setAttribute("class", "icon bi bi-cloud-upload");

			// Add file name and size text
			const file_name = document.createElement("p");
			file_name.setAttribute("class", "file-name");
			file_name.appendChild(document.createTextNode("No File Uploaded"));
			const file_size = document.createElement("p");
			file_size.setAttribute("class", "file-size");
			file_size.appendChild(document.createTextNode("0.00 KB"));

			const input_area = document.createElement("input");
			input_area.setAttribute("type", "file");
			input_area.setAttribute("id", "input-file");
			input_area.setAttribute("name", "file");
			input_area.setAttribute("accept", "image/*");

			// Append input to div
			upload_div.appendChild(sub_div);

			// Add action buttons
			const button_div = document.createElement("div");
			button_div.setAttribute("class", "action-btns");

			const reset = document.createElement("button");
			reset.setAttribute("type", "reset");
			reset.textContent = "Reset";
			reset.setAttribute("id", "reset-btn");

			const submit = document.createElement("button");
			submit.setAttribute("type", "submit");
			submit.textContent = "Convert";
			submit.setAttribute("id", "convert-btn");
			
			button_div.appendChild(reset);
			button_div.appendChild(submit);
			
			// Append input to form
			new_form.appendChild(heading);
			new_form.appendChild(instructions);
			upload_div.appendChild(file_name);
			upload_div.appendChild(file_size);
			upload_div.appendChild(input_area);
			new_form.appendChild(upload_div);
			new_form.appendChild(button_div);

			// Append form to the document and populate constants needed for listeners
			new_div.appendChild(new_form);
			document.getElementById('content').appendChild(new_div);
			uploadBox = document.querySelector('.upload-wrapper');
			uploadZone = document.querySelector('.upload-zone');
			
			// Add listeners as needed
			add_listeners();

			break;

		case 'extra':
			contentDiv.innerHTML = `
				<h2>About Us</h2>
				<p>Added as an extra button for demonstration</p>
			`;
			break;

		default:
			contentDiv.innerHTML = '<h2>Page not found!</h2>';
	}
}

function add_listeners() {
	// gets test button properly -- console.log(document.querySelector('.test-btn'))
	//document.querySelector('button').addEventListener('click', hello);

	
	const handleOnChange = (file) => {
		document.querySelector('.file-name').textContent = file.name;
		document.querySelector('.file-size').textContent = (file.size / 1024).toFixed(2) + " KB";
	}

	document.querySelector('#input-file').addEventListener("change", (e) => {
		handleOnChange(e.target.files[0])
	})

	uploadBox.addEventListener("submit", (e) => 
		{   e.preventDefault();
			// Check for valid file and confirm selection
			if (toConvert === null) {
				alert("Please select a file to convert!");
			}

			else if (toConvert.length > 1) {
				alert("Only one file can be converted at a time!");
				console.log(toConvert)
			}

			else {
				confirm("Convert " + toConvert[0].name + " to EAD?");
				parse_container_list();
			}
		})

	uploadBox.addEventListener("reset", () => {
		document.querySelector('.file-name').textContent = "No File Uploaded";
		document.querySelector('.file-size').textContent = "0.00 KB"
		toConvert = null;
	})

	uploadZone.addEventListener('dragenter', () => uploadZone.classList.add('is-dragging'));
	uploadZone.addEventListener('dragover', (e) => e.preventDefault());
	uploadZone.addEventListener('dragleave', (e) => {
		if (!uploadZone.contains(e.relatedTarget)) {
			uploadZone.classList.remove('is-dragging');
		}
	});

	uploadZone.addEventListener("drop", (e) => {
		e.preventDefault()
		handleOnChange(e.dataTransfer.files[0])
		uploadZone.classList.remove('is-dragging')
		toConvert = e.dataTransfer.files;
	})
}