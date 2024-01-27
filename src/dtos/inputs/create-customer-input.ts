import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCustomerInput {
    @Field(() => String)
    name: string
}