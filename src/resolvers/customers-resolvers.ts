import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Customer } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import prisma from "../prisma";
import { Appointment } from "../dtos/models/appointment-model";

@Resolver(() => Customer)
export class CustomersResolvers {
    @Query(() => Customer, { nullable: true })
    async customer(@Arg("id", () => String, { nullable: true }) id: string) { 
        if (!id) {
            return null
        }
        const customer = await prisma.customer.findUnique({
            where: {
                id
            }
        })
        return customer 
    }

    @Query(() => [Customer])
    async customers(): Promise<Customer[]> {
        const customers = await prisma.customer.findMany()
        return customers
    }

    @Mutation(() => Customer)
    async createCustomer(
        @Arg('data', () => CreateCustomerInput) data: CreateCustomerInput
    ): Promise<Customer> {
        const customer = await prisma.customer.create({ data })
        return customer
    }

    @FieldResolver(() => [Appointment])
    async appointments(@Root() customer: Customer) {
        const appointments = await prisma.appointment.findMany({
            where: {
                customerId: customer.id
            }
        })
        return appointments
    }  

}