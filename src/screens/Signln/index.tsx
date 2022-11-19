import React from "react";
import { Container } from "./styles";

import { Input } from "@components/input";
import { Button } from "@components/button";

export function SignIn(){

    return(
        <Container>

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

        <Button
          title="Entrar"
          type="secundary"
        />

        </Container>
    )

}