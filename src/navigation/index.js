import React from 'react';
import { Image, I18nManager, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import {
    Home, Categories, Cart, Profile, Wishlist,
    ProductDetails, Products, Buy, Requests, RequestDetails,
    CardInput, Settings, CustomersService, MyAccount,
    Register, Login, SubCategories, Policies, PaymentMethods,
    OrderSummary, CreditCardPayment, OrderDone, AddressMap
} from '../screens/index';
import { home, categories, cart, heart, profile } from '../images/index';
import { primaryColors } from '../theme/colors';
import TabButton from './TabButton';
import styles from './Style';
import Langs from '../lib/Langs';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        ProductDetails: {
            screen: ProductDetails,
        },
        Products: {
            screen: Products,
        },
    },
    {
        headerMode: 'none',
    }
);
HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'ProductDetails') {
        tabBarVisible = false
    }
    return {
        tabBarIcon: ({ focused }) => (
            focused ?
                <TabButton
                    image={
                        <Image source={home} style={{ width: 17, height: 19, tintColor: primaryColors.santaFe }} resizeMode='contain' />
                    } />
                :
                <Image source={home} style={{ width: 17, height: 19 }} resizeMode='contain' />
        ),
        tabBarLabel: ({ focused }) => (
            focused ?
                <Text style={styles.activeLabel}>{Langs.t('home')}</Text>
                :
                <Text style={[styles.activeLabel, { color: primaryColors.silverChalice }]}>{Langs.t('home')}</Text>
        ),
        tabBarVisible
    }
};

const CategoriesStack = createStackNavigator(
    {
        Categories: {
            screen: Categories,
        },
        ProductDetails: {
            screen: ProductDetails,
        },
        Products: {
            screen: Products,
        },
        SubCategories: {
            screen: SubCategories
        }
    },
    {
        headerMode: 'none',
    }
);
CategoriesStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'ProductDetails') {
        tabBarVisible = false
    }
    return {
        tabBarIcon: ({ focused }) => (
            focused ?
                <TabButton
                    image={
                        <Image source={categories} style={{ width: 17, height: 17, tintColor: primaryColors.santaFe }} resizeMode='contain' />
                    } />
                :
                <Image source={categories} style={{ width: 17, height: 17 }} resizeMode='contain' />
        ),
        tabBarLabel: ({ focused }) => (
            focused ?
                <Text style={styles.activeLabel}>{Langs.t('categories')}</Text>
                :
                <Text style={[styles.activeLabel, { color: primaryColors.silverChalice }]}>{Langs.t('categories')}</Text>
        ),
        tabBarVisible
    }
};

const CartStack = createStackNavigator(
    {
        Cart: {
            screen: Cart,
        },
        ProductDetails: {
            screen: ProductDetails,
        },
        Buy: {
            screen: Buy,
        },
        CardInput: {
            screen: CardInput,
        },
        PaymentMethods: {
            screen: PaymentMethods
        },
        OrderSummary: {
            screen: OrderSummary
        },
        CreditCardPayment: {
            screen: CreditCardPayment
        },
        OrderDone: {
            screen: OrderDone
        },
        AddressMap: {
            screen: AddressMap
        }
    },
    {
        headerMode: 'none',
    }
);
CartStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        focused ?
            <TabButton
                image={
                    <Image source={cart} style={{ width: 17, height: 21, tintColor: primaryColors.santaFe }} resizeMode='contain' />
                } />
            :
            <Image source={cart} style={{ width: 17, height: 21 }} resizeMode='contain' />
    ),
    tabBarLabel: ({ focused }) => (
        focused ?
            <Text style={styles.activeLabel}>{Langs.t('shoppingCart')}</Text>
            :
            <Text style={[styles.activeLabel, { color: primaryColors.silverChalice }]}>{Langs.t('shoppingCart')}</Text>
    ),
};

const WishlistStack = createStackNavigator(
    {
        Wishlist: {
            screen: Wishlist,
        },
        ProductDetails: {
            screen: ProductDetails,
        },
    },
    {
        headerMode: 'none',
    }
);
WishlistStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'ProductDetails') {
        tabBarVisible = false
    }
    return {
        tabBarIcon: ({ focused }) => (
            focused ?
                <TabButton
                    image={
                        <Image source={heart} style={{ width: 18, height: 24, tintColor: primaryColors.santaFe }} resizeMode='contain' />
                    } />
                :
                <Image source={heart} style={{ width: 18, height: 24 }} resizeMode='contain' />
        ),
        tabBarLabel: ({ focused }) => (
            focused ?
                <Text style={styles.activeLabel}>{Langs.t('favorites')}</Text>
                :
                <Text style={[styles.activeLabel, { color: primaryColors.silverChalice }]}>{Langs.t('favorites')}</Text>
        ),
        tabBarVisible
    }
};

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile,
        },
        Settings: {
            screen: Settings,
        },
        Requests: {
            screen: Requests
        },
        RequestDetails: {
            screen: RequestDetails
        },
        ProductDetails: {
            screen: ProductDetails,
        },
        CustomersService: {
            screen: CustomersService,
        },
        MyAccount: {
            screen: MyAccount,
        },
        Register: {
            screen: Register,
        },
        Login: {
            screen: Login,
        },
        Policies: {
            screen: Policies
        },
        AddressMap: {
            screen: AddressMap
        }
    },
    {
        headerMode: 'none',
    }
);
ProfileStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'ProductDetails') {
        tabBarVisible = false
    }
    return {
        tabBarIcon: ({ focused }) => (
            focused ?
                <TabButton
                    image={
                        <Image source={profile} style={{ width: 17, height: 21, tintColor: primaryColors.santaFe }} resizeMode='contain' />
                    } />
                :
                <Image source={profile} style={{ width: 17, height: 21 }} resizeMode='contain' />
        ),
        tabBarLabel: ({ focused }) => (
            focused ?
                <Text style={styles.activeLabel}>{Langs.t('account')}</Text>
                :
                <Text style={[styles.activeLabel, { color: primaryColors.silverChalice }]}>{Langs.t('account')}</Text>
        ),
        tabBarVisible
    }
};

export const AppTab = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Categories: { screen: CategoriesStack },
        Cart: { screen: CartStack },
        Wishlist: { screen: WishlistStack },
        Profile: { screen: ProfileStack },
    },
    {
        tabBarOptions: {
            style: {
                position: 'absolute',
                borderTopWidth: 0,
                height: 60,
                flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -3,
                },
                shadowOpacity: 0.05,
                shadowRadius: 5,

                elevation: 15,

            },

            tabStyle: {
                marginTop: 0,
            },
        },
    },
);


export const AppStacks = createAppContainer(AppTab);