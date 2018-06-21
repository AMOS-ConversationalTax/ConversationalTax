import { NavigatableRoutes } from '../config/navigation.config';

export interface NotificationMessage {
    title: string;
    description: string;
    read: boolean;
    navigateTo?: NavigatableRoutes;
    textForDialogflow?: string;
}