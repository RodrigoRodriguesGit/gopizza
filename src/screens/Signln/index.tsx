import React from "react";
import { Container } from "./styles";

import { Input } from "@components/input";

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

        </Container>
    )

}