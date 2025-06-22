import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontSize: 12, 
        fontFamily: 'Helvetica',
        color: '#374151', 
        backgroundColor: '#fff', 
    },
    header: {
        marginBottom: 20, 
        borderBottomWidth: 1, 
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
    },
    logo: {
        width: 60, 
        height: 60,
        marginRight: 16,
        objectFit: 'contain',
    },
    buyerName: {
        fontSize: 12, 
        fontWeight: 'bold', 
        color: '#111827', 
    },
    invoiceHeader: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#111827'
    },
    shopName: {
        fontSize: 20,
        fontWeight: 'bold', 
        color: '#111827',
    },
    address: {
        fontSize: 10,
        color: '#6b7280',
    },
    itemsHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#6b7280',
        borderBottomStyle: 'solid',
        paddingBottom: 5,
        marginTop: 20,
        fontWeight: 'bold',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'solid',
    },
    itemName: { flexBasis: '40%' },
    itemQty: { flexBasis: '20%', textAlign: 'right' },
    itemPrice: { flexBasis: '20%', textAlign: 'right' },
    itemTotal: { flexBasis: '20%', textAlign: 'right' },
    totalSection: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#111827',
    },
    totalValue: {
        fontSize: 14,
        marginLeft: 10,
        color: '#111827',
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#9ca3af',
    },
});

export default function InvoiceDocument({logo, shopName, address, phone, buyerName, footer, items}) {

    const validItems = (items || []).filter(
        item => 
            item &&
            item.name &&
            item.price &&
            !isNaN(parseFloat(item.price)) &&
            (item.quantity === undefined || item.quantity === null || !isNaN(parseFloat(item.quantity)))
    )

    const totalPrice = validItems.reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 1;
        const price = parseFloat(item.price) || 0;
        return acc + qty * price
    }, 0)
    

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.shopName}>{shopName || 'Shop Name'}</Text>
                        <Text style={styles.address}>{address || 'Shop Address'}</Text>
                    </View>
                    {logo && typeof logo === "string" && logo.trim() !== "" ? (
                        <Image style={styles.logo} src={logo} />
                    ) : (
                            <View style={styles.logo}>
                                <Text style={{fontSize: 20, color: '#111827'}}>Logo</Text>
                                <Text style={{fontSize: 10, color: '#6B7280'}}>No Logo Provider</Text>
                            </View>
                        )
                    }
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={styles.invoiceHeader}>Invoice</Text>
                    <Text style={styles.buyerName}>Buyer Name : {buyerName || 'Buyer Name'}</Text>
                    <Text style={styles.address}>{phone || 'Buyer Phone'}</Text>
                    <Text style={{fontSize: 12, color: '#6B7280'}}>Date: {new Date().toLocaleDateString()}</Text>
                </View>

                <View style={styles.itemsHeader}>
                    <Text style={styles.itemName}>Item</Text>
                    <Text style={styles.itemQty}>Quantity</Text>
                    <Text style={styles.itemPrice}>Price</Text>
                    <Text style={styles.itemTotal}>Total</Text>
                </View>

                {validItems.length === 0 ? (
                    <Text style={{marginTop: 10}}>No Items Added</Text>
                ): (
                    validItems.map((item, index) => {
                        let qty = parseFloat(item.quantity);
                        if (isNaN(qty) || qty <= 0) qty = 1;
                        const price = parseFloat(item.price) || 0;
                        const name = item.name || 'Unnamed Item'
                        return (
                            <View style={styles.itemRow} key={index}>
                                <Text style={styles.itemName}>{name}</Text>
                                <Text style={styles.itemQty}>{qty}</Text>
                                <Text style={styles.itemPrice}>{price.toFixed(2)}</Text>
                                <Text style={styles.itemTotal}>${(qty * price).toFixed(2)}</Text>
                            </View>
                        )
                    })
                )
                }
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.itemQty}>${totalPrice.toFixed(2)}</Text>
                </View>

                <Text style={styles.footer}>{footer || 'Thank you for doing business!'}</Text>
            </Page>
            </Document>
    );
}