import React from "react";
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

export function SignIn(){
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
                />

              <Input 
                  placeholder="Senha"
                  type="secundary"
                  secureTextEntry
                />

              <ForgotPasswordButton>
                <ForgotPasswordLabel>
                  Esqueci minha senhg
                </ForgotPasswordLabel>
              </ForgotPasswordButton>

              <Button
                title="Entrar"
                type="secundary"
              />

          </Content>
        </KeyboardAvoidingView>
      </Container>

    )

}