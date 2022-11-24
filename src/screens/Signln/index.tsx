import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import brandImg from '@assets/brand.png'
import { Input } from "@components/input";
import { Button } from "@components/button";

import {
  Container, 
  Content, 
  Title, 
  Band, 
  ForgotPasswordButton, 
  ForgotPasswordLabel } 
from "./styles";
import { useAuth } from '@hooks/auth'

export function SignIn(){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const  { signIn, isLogging} = useAuth();

    function HandleSignIn() {
      signIn(email, password)
    }

    return(

      <Container>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined }>
          <Content>
              <Band source={brandImg}></Band>

              <Title>Login</Title>      
              
              <Input 
                  placeholder="E-mail"
                  type="secundary"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setEmail}
                />

              <Input 
                  placeholder="Senha"
                  type="secundary"
                  secureTextEntry
                  onChangeText={setPassword}
                />

              <ForgotPasswordButton>
                <ForgotPasswordLabel>
                  Esqueci minha senhg
                </ForgotPasswordLabel>
              </ForgotPasswordButton>

              <Button
                title="Entrar"
                type="secundary"
                onPress={HandleSignIn}
                isLoading={isLogging}
              />

          </Content>
        </KeyboardAvoidingView>
      </Container>

    )

}