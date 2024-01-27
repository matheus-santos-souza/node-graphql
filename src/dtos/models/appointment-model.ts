import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Appointment {
    @Field(() => String)
    id: string;

    @Field(() => String)
    customerId: string;

    @Field(() => Date)
    startsAt: Date;

    @Field(() => Date)
    endsAt: Date;
}