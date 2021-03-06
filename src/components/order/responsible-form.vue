<template>
	<form class="responsible">
		<app-input
			placeholder="Persona responsable de recibir"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.name"
			@input="validateForm"
		>
			<span v-if="$v.responsible.name.$invalid">El nombre es requerido</span>
		</app-input>
		<app-input
			placeholder="Apellido responsable de recibir"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.lastname"
			@input="validateForm"
		>
			<span v-if="$v.responsible.lastname.$invalid">El Apellido es requerido</span>
		</app-input>
		<app-input
			:placeholder="labelCountry"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.dni"
			@input="validateForm"
		>
			<span v-if="!$v.responsible.dni.required">{{labelError}}.</span>
			<span v-if="isPeru && !$v.responsible.dni.validDni">Solo se permiten números</span>
		</app-input>
		<app-input
			placeholder="Celular"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.phone"
			@input="validateForm"
		>
			<span v-if="$v.responsible.phone.$invalid">El teléfono es requerido</span>
		</app-input>
		<app-input
			placeholder="Correo"
			type="email"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.email"
			@input="validateForm"
		>
			<span v-if="!$v.responsible.email.required">El correo es requerido</span>
			<span v-if="!$v.responsible.email.email">El correo es inválido</span>
		</app-input>
	</form>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { getDeeper } from '@/shared/lib';
import appInput from '@/components/shared/inputs/app-input';

function mounted() {
	if (getDeeper('responsiblePickUp')(this.getOrderInfo)) {
		this.responsible = { ...this.getOrderInfo.responsiblePickUp };
		this.loadedFromOrder = true;
		this.validateForm();
	} else {
		this.setUserData(this.user);
	}
}

function setUserData(user) {
	if (!this.loadedFromOrder) {
		const { dni, email: mail, name, phone, lastname } = user;
		this.responsible = { dni, name, email: mail, phone, lastname };
		this.validateForm();
	}
}

function validateForm() {
	this.$store.commit('SET_RESPONSIBLE', null);
	if (!this.$v.$invalid) {
		this.$store.commit('SET_RESPONSIBLE', this.responsible);
	}
}

function labelCountry() {
	return getDeeper('company.country.countryCode')(this.user) === 'ECU' ? 'Cédula' : 'DNI';
}

function labelError() {
	return getDeeper('company.country.countryCode')(this.user) === 'ECU' ? 'El número de documento es requerido' : 'El DNI es requerido';
}

function validDni(dni) {
	const reg = /[0-9]/i;
	return reg.test(dni);
}

function validations() {
	const validating = {
		responsible: {
			dni: { required },
			email: { email, required },
			lastname: { required },
			name: { required },
			phone: { required },
		},
	};
	if (this.isPeru) {
		validating.responsible.dni.validDni = this.validDni;
	}
	return validating;
}

function data() {
	return {
		loadedFromOrder: false,
		responsible: {
			dni: '',
			email: '',
			lastname: '',
			name: '',
			phone: '',
		},
	};
}

export default {
	name: 'responsible-form',
	components: {
		appInput,
	},
	computed: {
		...mapGetters([
			'user',
			'getOrderInfo',
		]),
		labelCountry,
		labelError,
	},
	data,
	methods: {
		setUserData,
		validDni,
		validateForm,
	},
	mounted,
	validations,
	watch: {
		user: setUserData,
	},
};
</script>
<style lang="scss" scoped>
	.responsible {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20px;
	}

	.responsible-field {
		flex: 1 1 47%;
		height: 68px;
	}
</style>
