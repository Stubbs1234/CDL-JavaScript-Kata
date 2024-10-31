type PricingRule = {
    unitPrice: number;
    discountQuantity?: number;
    discountPrice?: number;
};

const pricingRules = {
    "A": { unitPrice: 50, discountQuantity: 3, discountPrice: 130 },
    "B": { unitPrice: 30, discountQuantity: 2, discountPrice: 45 },
    "C": { unitPrice: 20 },
    "D": { unitPrice: 15 }
};

class Checkout {
    private basket: { [sku: string]: number } = {};
    private pricingRules: { [sku: string]: PricingRule };

    constructor(pricingRules: { [sku: string]: PricingRule }) {
        this.pricingRules = pricingRules;
    }

    addItem(sku: string): void {
        if (!this.basket[sku]) {
            this.basket[sku] = 0;
        }
        this.basket[sku]++;
        
    }

}