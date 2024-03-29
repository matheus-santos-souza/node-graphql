import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";
import prisma from "../prisma";

@Resolver(() => Appointment)
export class AppointmentsResolvers {
    @Query(() => Appointment, { nullable: true })
    async appointment(@Arg("id", () => String, { nullable: true }) id: string) { 
        if (!id) {
            return null
        }
        const customer = await prisma.appointment.findFirst({
            where: {
                id
            }
        })
        return customer
    }

    @Query(() => [Appointment])
    async appointments(): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany()
        return appointments
    }

    @Mutation(() => Appointment)
    async createAppointment(
        @Arg('data', () => CreateAppointmentInput) data: CreateAppointmentInput
    ): Promise<Appointment> {
        const appointment = await prisma.appointment.create({ data })
        return appointment
    }

    @FieldResolver(() => Customer)
    async customer(@Root() appointment: Appointment) {
        const customer = await prisma.customer.findFirst({
            where: {
                id: appointment.customerId
            }
        })
        return customer
    }
}