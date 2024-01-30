import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";
import prisma from "../prisma";

@Resolver(() => Appointment)
export class AppointmentsResolvers {
    @Query(() => [Appointment])
    async findAllAppointments(): Promise<Appointment[]> {
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