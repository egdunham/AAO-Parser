import {parse_container_list} from "./write_ead.js"

let uploadBox = null;
let uploadZone = null;
let toConvert = null;

// Set up listeners for the left-side navigation
document.querySelector('.test-btn').addEventListener('click', function() {changeContent("guide_convert")});

function changeContent(page) {
	var contentDiv = document.getElementById('content');
	switch (page) {
		case 'guide_convert':
			document.getElementById("content").innerHTML = "";

			// Add repository information
			const repo_div = document.createElement("div");
			const repo_form = document.createElement("form");
			repo_form.setAttribute("class", "input-format");
			const repo_heading = document.createElement("h2");
			const repo_heading_text = document.createTextNode("Repository Information");
			repo_heading.appendChild(repo_heading_text);
			repo_form.appendChild(repo_heading);

			repo_form.appendChild(create_input_section("repo_code", "MARC Code:"));
			repo_form.appendChild(create_input_section("repo_name", "Name:"));
			repo_form.appendChild(create_input_section("repo_address_1", "Address (Line 1):"));
			repo_form.appendChild(create_input_section("repo_address_2", "Address (Line 2):"));
			repo_form.appendChild(create_input_section("repo_phone", "Phone Number:"));
			repo_form.appendChild(create_input_section("repo_email", "E-Mail:"));

			repo_div.appendChild(repo_form);
			repo_div.appendChild(create_spacer());
			document.getElementById('content').appendChild(repo_div);

			// Add technical information
			const tech_div = document.createElement("div");
			const tech_form = document.createElement("form");
			tech_form.setAttribute("class", "input-format");
			const tech_heading = document.createElement("h2");
			const tech_heading_text = document.createTextNode("Technical Information");
			tech_heading.appendChild(tech_heading_text);
			tech_form.appendChild(tech_heading);

			tech_form.appendChild(create_input_section("guide_filetitle", "Guide File Name:"));
			tech_form.appendChild(create_input_section("guide_author", "Finding Aid Author:"));
			tech_form.appendChild(create_input_section("guide_lang", "Finding Aid Language:"));

			tech_div.appendChild(tech_form);
			tech_div.appendChild(create_spacer());
			document.getElementById('content').appendChild(tech_div);

			// Add overview
			const overview_div = document.createElement("div");
			const overview_form = document.createElement("form");
			overview_form.setAttribute("class", "input-format");
			const overview_heading = document.createElement("h2");
			const overview_heading_text = document.createTextNode("Collection Overview");
			overview_heading.appendChild(overview_heading_text);
			overview_form.appendChild(overview_heading);

			overview_form.appendChild(create_input_section("coll_id", "Identifier:"));
			overview_form.appendChild(create_input_section("coll_title", "Title:"));
			overview_form.appendChild(create_input_section("coll_filetitle", "Filing Title:"));
			overview_form.appendChild(create_input_section("coll_dates", "Dates:"));
			overview_form.appendChild(create_input_section("coll_boxes", "Boxes:"));
			overview_form.appendChild(create_input_section("coll_lf", "Linear Feet:"));
			overview_form.appendChild(create_input_section("coll_lang", "Language of Materials:"));

			overview_div.appendChild(overview_form);
			overview_div.appendChild(create_spacer());
			document.getElementById('content').appendChild(overview_div);

			// Add notes
			const notes_div = document.createElement("div");
			const notes_form = document.createElement("form");
			notes_form.setAttribute("class", "input-format");
			const notes_heading = document.createElement("h2");
			const notes_heading_text = document.createTextNode("Descriptive Notes");
			notes_heading.appendChild(notes_heading_text);
			notes_form.appendChild(notes_heading);

			notes_form.appendChild(create_input_section("coll_abstract", "Abstract:"));
			notes_form.appendChild(create_input_section("coll_historical", "Biographical or Historical Note:"));
			notes_form.appendChild(create_input_section("coll_scope", "Scope and Content Note:"));
			notes_form.appendChild(create_input_section("coll_arrangement", "Arrangement:"));
			notes_form.appendChild(create_input_section("coll_access", "Access Restrictions:"));
			notes_form.appendChild(create_input_section("coll_use", "Use Restrictions:"));
			notes_form.appendChild(create_input_section("coll_related", "Related Materials:"));
			notes_form.appendChild(create_input_section("coll_separated", "Separated Materials:"));
			notes_form.appendChild(create_input_section("coll_altformats", "Alternative Formats:"));
			notes_form.appendChild(create_input_section("coll_prefcite", "Preferred Citation:"));
			notes_form.appendChild(create_input_section("coll_acq", "Acquisition Information:"));
			notes_form.appendChild(create_input_section("coll_accruals", "Accruals:"));
			notes_form.appendChild(create_input_section("coll_custodhist", "Custodial History:"));
			notes_form.appendChild(create_input_section("coll_procinfo", "Processing Information:"));

			notes_div.appendChild(notes_form);
			notes_div.appendChild(create_spacer());
			document.getElementById('content').appendChild(notes_div);


			// Add upload zone
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

// Factory producing input fields for the guide conversion page
function create_input_section(label_for, label_text) {
	const new_input = document.createElement("div");
	new_input.setAttribute("class", "input-box");

	const new_input_label = document.createElement("label");
	new_input_label.setAttribute("for", label_for);
	new_input_label.appendChild(document.createTextNode(label_text));

	const new_input_content =  document.createElement("input");
	new_input_content.setAttribute("type", "text");
	new_input_content.setAttribute("id", label_for);
	
	// Append children to form
	new_input.appendChild(new_input_label);
	new_input.appendChild(new_input_content);

	return new_input;
			
}


// Creates a single spacer
function create_spacer() {
	const spacer = document.createElement("div");
	spacer.setAttribute("class", "spacer");
	return spacer;
}

function add_listeners() {
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