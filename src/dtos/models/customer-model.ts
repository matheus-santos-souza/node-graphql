import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string
}