import { NavigationActions, DrawerActions } from 'react-navigation';

/**
 * Singleton NavigationService
 */
class NavigationServiceInstance {
    private static _instance: NavigationServiceInstance;
    private _navigator: any;
    private routeStack: string[] = [];

    /**
     * Initlizes this service
     * @param navigatorRef the Ref to the root navigator
     */
    public setTopLevelNavigator(navigatorRef: any): void {
        this._navigator = navigatorRef;
    }

    /**
     * Navigates to another route
     * @param routeName name as specified in App.tsx
     * @param params optional params
     */
    public navigate(routeName: string, params?: any): void {
        this.routeStack.push(routeName);
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    /**
     * Go back one step
     */
    public goBack(): void {
        this.routeStack.pop();
        const routeName = this.routeStack.pop();
        if (routeName !== undefined) {
            this.navigate(routeName);
        }
    }

    /**
     * Returns the active route
     * @returns {string} routeName
     */
    public activeRoute(): string {
        const lastIndex = this.routeStack.length - 1;
        if (lastIndex < 0) {
            return '';
        }
        return this.routeStack[lastIndex];
    }

    /**
     * Opens the drawer Navigation
     */
    public openDrawer(): void {
        this._navigator.dispatch(
            DrawerActions.openDrawer()
        );  
    }

    /**
     * Returns the singletons instance.
     * @returns {NavigationServiceInstance} The NavigationServiceInstance instance
     */
    public static get Instance(): NavigationServiceInstance {
        return this._instance || (this._instance = new this());
    }
}

export const NavigationService = NavigationServiceInstance.Instance
