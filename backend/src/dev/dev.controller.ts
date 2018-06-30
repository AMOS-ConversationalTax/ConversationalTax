import { Get, Controller, Query } from '@nestjs/common';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { UserIdParam } from './dev.dto';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { NotificationsDBService } from '../database/notifications/notifications.service';

/**
 * Dev controller used better showcase the app
 */
@Controller('dev')
export class DevController {
    constructor(private readonly employmentContractModule: EmploymentContractService,
                private readonly conversationHistoryService: ConversationHistoryService,
                private readonly notificationsDBService: NotificationsDBService) {
    }

    /**
     * Method to reset the contracts for a specific user
     * @param {ResetUserParams} params Containing the user id
     */
    @Get('resetUserContracts')
    async resetUserContracts(@Query() params: UserIdParam): Promise<void> {
        const contracts = await this.employmentContractModule.findEmploymentContractsOfUser(params.u_id);
        const promises: Promise<any>[] = [];
        contracts.forEach(contract => {
            promises.push(
                this.employmentContractModule.deleteEmploymentContract(contract._id),
            );
        });
        await Promise.all(promises);
    }

    /**
     * Method to reset the conversation history for a specific user
     * @param {ResetUserParams} params Containing the user id
     */
    @Get('resetUserHistory')
    async resetUserHistory(@Query() params: UserIdParam): Promise<void> {
        const items = await this.conversationHistoryService.findConversationHistoryOfUser(params.u_id);
        const promises: Promise<any>[] = [];
        items.forEach(item => {
            promises.push(
                this.conversationHistoryService.deleteConversationHistoryItem(item._id),
            );
        });
        await Promise.all(promises);
    }

    /**
     * Method to reset the notifications for a specific user
     * @param {ResetUserParams} params Containing the user id
     */
    @Get('resetUserNotification')
    async resetUserNotification(@Query() params: UserIdParam): Promise<void> {
        const notifications = await this.notificationsDBService.findNotificationByUser(params.u_id);
        const promises: Promise<any>[] = [];
        notifications.forEach(notification => {
            promises.push(
                this.notificationsDBService.deleteNotification(notification._id),
            );
        });
        await Promise.all(promises);
    }

}
