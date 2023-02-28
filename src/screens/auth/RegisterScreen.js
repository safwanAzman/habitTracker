import React, {useState} from 'react';
import { View,Text,Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme } from '../../theme';

// component
import Input from '../../components/form/Input';
import Btnsubmit from '../../components/btn/BtnSubmit';

import { AuthContext } from '../../context/auth/AuthContext';
import { apiRegister } from '../../services/auth';

export default function RegisterScreen({navigation}) {
    const { handlingLoading } = React.useContext(AuthContext);
    const SignUpSchema = Yup.object().shape({
        name: Yup.string().required("username Required"),
        email: Yup.string().required("Email Required"),
        password: Yup.string().required("Password Required"),
        password_confirmation: Yup.string()
        .required("confirm password Required")
        .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
        }),
    });

    const register = async (data,actions) => {
        try{
            handlingLoading();
            const result = await apiRegister(data);
            console.log(result);
            handlingLoading();
        } catch (e) {
            handlingLoading();
            if(e.status === 422 ){
                const errors = e.data.errors;
                console.log(errors)
                Object.keys(errors).forEach(function (key){
                    actions.setFieldError(key,errors[key][0]);
                });
            }else if(e.status === 200){
                alert(e.data.message)
            }
        }
    };
    
    return (
        <View className="flex-1">
            <KeyboardAwareScrollView  showsVerticalScrollIndicator={false} bounces={false} >
                <Formik
                    validationSchema={SignUpSchema}
                    initialValues={{ 
                        name: '' ,
                        email:'' ,
                        password: '' ,
                        password_confirmation:'' 
                    }}
                    onSubmit={(values,actions)=>{
                        register(values,actions);
                    }}
                >
                {({ handleChange,handleSubmit,values,errors,touched}) => (
                <>
                    <View className="mb-20">
                        <View className="">
                            
                        </View>
                        <View className="mx-5 mt-5">
                            <View className="space-y-1">
                                <Text className="text-2xl font-bold">Register</Text>
                                <Text className="text-base text-gray-500 ">
                                    Welcome! Please fill form to sign up into your account
                                </Text>
                            </View>
                            <View className="mb-2">
                                <Input
                                    placeholder="Full Name"
                                    onChangeText={handleChange("name")}
                                    value={values.name}
                                    errorMessage={errors.name && touched.name ? errors.name : null}
                                />
                            </View>
                            <View className="mb-2">
                                <Input
                                    placeholder="Email"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    errorMessage={errors.email && touched.email ? errors.email : null}
                                />
                            </View>
                            <View className="mb-2">
                                <Input
                                    placeholder="Password"
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    secureTextEntry={true}
                                    showPass={true}
                                    errorMessage={errors.password && touched.password ? errors.password : null}
                                />
                            </View>
                            <View className="mb-2">
                                <Input
                                    placeholder="Confirm Password"
                                    onChangeText={handleChange("password_confirmation")}
                                    value={values.password_confirmation}
                                    secureTextEntry={true}
                                    showPass={true}
                                    errorMessage={errors.password_confirmation && touched.password_confirmation ? errors.password_confirmation : null}
                                />
                            </View>
                            <View className="mt-4">
                                <Btnsubmit
                                    title="Sign up"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
            <View className="flex flex-row items-center justify-center w-full py-4 m-auto space-x-1 bg-gray-100">
                <Text className="text-sm">have an Account</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text className="text-sm font-semibold" style={{color:theme.colors.main}}>
                        Sign in
                    </Text>
                </Pressable>
            </View>   
        </View>
    );
}

