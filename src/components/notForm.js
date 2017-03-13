import notComponent from '../template/notComponent';
import notRecord from '../notRecord';
import notBase from '../notBase';
import notPath from '../notPath';

const OPT_DEFAULT_FORM_PREFIX = 'form_',
	OPT_DEFAULT_ROLE_NAME = 'default',
	OPT_DEFAULT_FORM_TITLE = 'Form default title',
	OPT_DEFAULT_FIELD_DEFINITION = {

	};

class notForm extends notBase {
	constructor(input) {
		super();
		this.setOptions(input.options || {});
		if (!this.getOptions('prefix')) {
			this.setOptions('prefix', OPT_DEFAULT_FORM_PREFIX);
		}
		this.setWorking({
			components: []
		});
		let data = input.data || {};
		if (!data.isRecord) {
			console.log('data is not record');
			data = new notRecord({}, data);
		}
		this.setData(data);
		this.on('submit', this.onSubmit.bind(this));
		this.on('reset', this.onReset.bind(this));
		this.on('cancel', this.onCancel.bind(this));
		this.render();
		return this;
	}

	getManifest() {
		return this.getData().getManifest();
	}

	getActionData() {
		let manifest = this.getManifest();
		if (manifest && manifest.actions) {
			return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
		} else {
			return null;
		}
	}

	getFormFieldsList() {
		let actionData = this.getActionData(),
			list = [],
			role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME);
		if (actionData) {
			console.log(actionData);
			if (actionData.fields) {
				if (actionData.fields.hasOwnProperty(role)) {
					list = actionData.fields[role];
				}
			}
		}
		return list;
	}

	/*
		Rendering
	*/

	render() {
		this.renderWrapper();
	}

	getPartTemplateName(formPart){
		return this.getOptions('prefix') + formPart;
	}

	renderWrapper() {
		if (this.getWorking('wrapper')) {
			this.getWorking('wrapper').update();
		} else {
			let input = {
				data: this.getWrapperData(),
				template: {
					name: this.getPartTemplateName('wrapper')
				},
				options: {
					helpers: this.getOptions('helpers'),
					targetEl: this.getOptions('targetEl'),
					id: this.getOptions('id')
				},
				events:[
					[['afterRender', 'afterUpdate'], this.renderComponents.bind(this)]
				]
			};
			console.log(input.template);
			let wrapper = new notComponent(input);
			this.setWorking('wrapper', wrapper);
		}
	}

	getWrapperData() {
		let actionData = this.getActionData();
		return {
			title: actionData.title ? actionData.title : OPT_DEFAULT_FORM_TITLE
		};
	}

	renderComponents() {
		console.log('manifest', this.getFormFieldsList());
		if (this.getWorking('components') && this.getWorking('components').length){
			for(let t = 0; t < this.getWorking('components').length; t++){
				this.getWorking('components')[t].component.update();
			}
		}else{
			for(let t = 0; t < this.getFormFieldsList().length; t++){
				let fieldName = this.getFormFieldsList()[t];
				this.addFieldComponent(fieldName);
			}
		}
	}

	clearFieldsComponents() {
		let comps = this.getWorking('components');
		while (comps.length > 0) {
			comps[0].component.destroy();
			comps.splice(0, 1);
		}
	}

	getFieldsDefinition(fieldName) {
		let def = OPT_DEFAULT_FIELD_DEFINITION;
		if (this.getOptions('fields') && this.getOptions('fields').hasOwnProperty(fieldName)) {
			def = this.getOptions('fields')[fieldName];
		}
		return def;
	}

	addFieldComponent(fieldName) {
		let fieldType = this.getFieldsDefinition(fieldName);
		console.log(fieldName);
		let rec = {
			field: {
				name: fieldName,
				title: fieldType.label || fieldType.placeholder,
				type: fieldType.type,
				label: fieldType.label,
				array: fieldType.array,
				default: fieldType.default,
				placeholder: fieldType.placeholder,
				options: this.getOptions(notPath.join('helpers','libs',fieldName))
			}
		};
		rec.component = new notComponent({
			data: this.getData(),
			template: {
				name: this.getPartTemplateName(fieldType.type)
			},
			options: {
				helpers: {
					isChecked: (params)=>{
						return params.item.value === this.getData(fieldName)
					},
					field: rec.field,
					data: this.getData(),
					libs: this.getOptions(notPath.join('helpers','libs'))
				},
				targetEl: this.getFormBodyElement(),
				renderAnd: 'placeLast',
				events:[
					['afterDataChange', this.collectDataFromComponents.bind(this)]
				]
			}
		});
		this.getWorking('components').push(rec);
	}

	collectDataFromComponents(params){
		console.log('collect data from components', params);
	}

	getFormBodyElement(){
		return this.getOptions('targetEl').querySelector('[role="body"]')
	}

	/*
		Data management
	*/

	collectData() {

	}

	/*
		Event handlers
	*/

	onSubmit() {

	}

	onReset() {

	}

	onCancel() {

	}

	getFields() {

	}

	addField() {

	}

	removeField() {

	}
}

export default notForm;
