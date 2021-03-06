<template>
	<div
		class="product-container"
		:class="{ 'small': small }"
		@click="goToProduct(product)"
		@mousemove="onCard"
		@mouseenter="mouseOnCard = true"
		@mouseleave="mouseOnCard = false"
		:style="animatingCard"
	>
		<div :class="{ 'opacity': !product.stockWarehouse }">
			<div v-if="!product.stockWarehouse && !indeterminate" class="without-stock-tag">
				Agotado
			</div>
			<div class="pd-10">
				<section class="product-header" :class="{ 'small': small }">
					<div
						v-if="product.priceDiscount || !indeterminate"
						:style="`background-color:${indeterminate ? 'transparent' : globalColors.primary}`"
						:class="[
							'product-discount',
							{ 'loading loading-dark': indeterminate },
						]"
					>
						<span v-if="!indeterminate">- {{discountPercentage}}%</span>
					</div>
					<div class="product-favorite">
						<heart-component @click="productFavo" :value="product.flagFavorite"/>
					</div>
				</section>
				<section class="product-content" :class="small ? 'small' : null">
					<div
						:class="[
							{ 'loading img-space': indeterminate },
						]"
					>
						<img
							v-if="!indeterminate"
							:class="[
							'product-img',
							]"
							:src="product.urlImage"
							alt="imagen del product"
						>
					</div>
					<div class="product-description-wrapper">
						<p
							:class="[
								indeterminate ? 'loading text-field' : 'product-description'
							]"
						>{{product.description}}</p>
						<small
							v-if="product.warehouseProduct && product.warehouseProduct.brand"
							class="product-brand">{{product.warehouseProduct.brand.name}}</small>
						<h3
							v-if="product.priceDiscount"
							:style="`color: ${indeterminate ? 'transparent' : globalColors.primary};`"
							:class="[
								indeterminate ? 'loading text-field' : 'product-price-discount'
							]"
						>
							{{ product.priceDiscount | currencyFormat }}
						</h3>
						<small
							v-if="product.price"
							:class="[
								indeterminate ? 'loading text-field' : product.priceDiscount ? 'product-price' : 'product-price-discount',
							]"
							:style="`color: ${indeterminate ? 'transparent' : globalColors.primary};`"
						>
							{{ product.price | currencyFormat }}
						</small>
						<small
							:class="[
								indeterminate ? 'loading text-field' : 'other-buy',
							]"
						>+ 1000 compraron esto</small>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import heartComponent from '@/components/shared/icons/heart-component';

function productFavo() {
	if (this.token) {
		this.$store.dispatch('SET_FAVORITE_FLAG', { context: this, product: this.product });
		this.$set(this.product, 'flagFavorite', !this.product.flagFavorite);
	} else {
		const text = 'Debe iniciar sesión para seleccionar producto como favorito';
		this.$store.dispatch('showSnackBar', { text, color: 'error' });
	}
}

function buyProduct() {
	this.$store.commit('SET_PRODUCT_TO_BUY', this.product);
}

function goToProduct({ slug, id }) {
	const params = { id: slug || id };
	this.goTo('detail-product', { params });
}

function discountPercentage() {
	const { price, priceDiscount } = this.product;
	const percentage = Number((((price - priceDiscount) / price) * 100).toFixed(2));
	return percentage >= 0 ? percentage : 0;
}

function animatingCard() {
	if (this.mouseOnCard) {
		const middleX = this.elWidth / 2;
		const middleY = this.elHeight / 2;
		const maxDeg = 3;
		const rateX = (middleX - this.x) / (this.elWidth / 2);
		const rateY = (middleY - this.y) / (this.elHeight / 2);
		return `transform:perspective(500px) rotateY(${(-rateX * maxDeg)}deg) rotateX(${(rateY * maxDeg)}deg) scale3d(1.02, 1.02, 1.02);`;
	}
	return 'transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);';
}

function onCard(v) {
	this.elWidth = v.target.offsetWidth;
	this.elHeight = v.target.offsetHeight;
	this.x = v.offsetX;
	this.y = v.offsetY;
}

function data() {
	return {
		x: 0,
		y: 0,
		elWidth: 0,
		elHeight: 0,
		mouseOnCard: false,
	};
}

export default {
	name: 'product-card',
	components: {
		heartComponent,
	},
	computed: {
		...mapGetters([
			'getProductsParams',
			'indeterminate',
		]),
		animatingCard,
		discountPercentage,
	},
	data,
	methods: {
		buyProduct,
		productFavo,
		goToProduct,
		onCard,
	},
	props: {
		small: {
			type: Boolean,
			default: false,
		},
		product: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-container {
		background-color: color(white);
		border: 1px solid color(border);
		box-shadow: 0 2px 2px 0 rgba(31, 26, 26, 0.07);
		cursor: pointer;
		font-family: font(medium);
		height: auto;
		transform: perspective(0px) rotateY(deg) rotateX(0deg) scale3d(0, 0, 0);
  		transition: all 120ms ease;

		@media (min-width: 500px) {
			border: 3px solid color(border);
			border-radius: 5px;
			height: 328px;
			margin: 3px;
			max-width: 202px;
		}

		&.small {
			min-height: 319px;
			max-width: 179px;
		}
	}

	.product-header {
		align-items: center;
		display: flex;
		height: 3rem;
		justify-content: space-between;
	}

	.product-discount {
		border-radius: 5px;
		color: color(white);
		font-family: font(medium);
		font-size: size(large);
		padding: 8px 15px;
	}

	.product-content {
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 0 5px;
		padding: 0 15px;
		text-align: center;

		div {
			margin: 0 10px;
		}

		@media (max-width: 500px) {
			&.small {
				flex-direction: column;
			}
		}

		@media (min-width: 426px) {
			flex-direction: column;
		}

		@media (max-width: 975px) {
			&.small {
				padding: 0px;
			}
		}
	}

	.product-description-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.product-img {
		height: 130px;
		object-fit: contain;
		width: 125px;
	}

	.product-description {
		color: color(dark);
		font-size: size(small);
		height: 35px;
		margin: 0 auto;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-transform: capitalize;
	}

	.product-brand {
		color: color(base);
		font-size: size(xsmall);
	}

	.product-price-discount {
		font-family: font(bold);
		font-size: size(xlarge);
	}

	.product-price,
	.other-buy {
		color: color(base) !important;
		font-size: size(xsmall);
	}

	.other-buy {
		font-family: font(regular);
		display: none;

		@media (min-width: 500px) {
			display: block;
			flex-direction: column;
		}
	}

	.product-price {
		text-decoration: line-through;
	}

	.product-rating {
		margin: 0 !important;

		.v-icon {
			padding: 0.3rem !important;
		}
	}

	.opacity {
		height: 100%;
		opacity: 0.43;
		position: relative;

		.without-stock-tag {
			background-color: color(dark);
			bottom: 0;
			color: color(white);
			font-family: font(bold);
			font-size: size(xlarge);
			height: 48px;
			left: 0;
			line-height: 48px;
			margin: auto;
			position: absolute;
			right: 0;
			text-align: center;
			text-transform: uppercase;
			top: 0;
			width: 100%;
		}
	}

	.pd-10 {
		padding: 10px;
	}

	.img-space {
		height: 130px;
		margin: 5px 0 !important;
		width: 125px;
	}

	.text-field {
		height: 18px;
		margin: 3px 0;
	}

	.rating {
		height: 12px;
		margin: 13px 0 0 !important;
	}
</style>

