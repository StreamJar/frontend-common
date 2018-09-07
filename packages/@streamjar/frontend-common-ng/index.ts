import { NgModule } from '@angular/core';
import * as Models from '@streamjar/frontend-common-core/models';
import { HttpService } from '@streamjar/frontend-common-core';

export function AccountFactory(dep: HttpService) { return new Models.Account(dep); }
export function ChannelFactory(dep: HttpService) { return new Models.Channel(dep); }
export function StatisticsFactory(dep: HttpService) { return new Models.Statistics(dep); }
export function FollowerFactory(dep: HttpService) { return new Models.Follower(dep); }
export function SubscriberFactory(dep: HttpService) { return new Models.Subscriber(dep); }
export function InviteFactory(dep: HttpService) { return new Models.Invite(dep); }
export function PermissionFactory(dep: HttpService) { return new Models.Permission(dep); }
export function ServiceFactory(dep: HttpService) { return new Models.Service(dep); }
export function GoalFactory(dep: HttpService) { return new Models.Goal(dep); }
export function QuoteFactory(dep: HttpService) { return new Models.Quote(dep); }
export function CommandFactory(dep: HttpService) { return new Models.Command(dep); }
export function MessageFactory(dep: HttpService) { return new Models.Message(dep); }
export function SettingsFactory(dep: HttpService) { return new Models.Settings(dep); }
export function TwitterFactory(dep: HttpService) { return new Models.Twitter(dep); }
export function WebsiteFactory(dep: HttpService) { return new Models.Website(dep); }
export function FilterFactory(dep: HttpService) { return new Models.Filter(dep); }
export function RankFactory(dep: HttpService) { return new Models.Rank(dep); }
export function BoostFactory(dep: HttpService) { return new Models.Boost(dep); }
export function TimedMessageFactory(dep: HttpService) { return new Models.TimedMessage(dep); }
export function WarningFactory(dep: HttpService) { return new Models.Warning(dep); }
export function PanelFactory(dep: HttpService) { return new Models.Panel(dep); }
export function PointsFactory(dep: HttpService) { return new Models.Points(dep); }
export function OAuthApplicationFactory(dep: HttpService) { return new Models.OAuthApplication(dep); }
export function TipFactory(dep: HttpService) { return new Models.Tip(dep); }
export function AuthorizationFactory(dep: HttpService) { return new Models.Authorization(dep); }
export function PlatformFactory(dep: HttpService) { return new Models.Platform(dep); }
export function SessionFactory(dep: HttpService) { return new Models.Session(dep); }
export function TipperFactory(dep: HttpService) { return new Models.Tipper(dep); }
export function IntegrationFactory(dep: HttpService) { return new Models.Integration(dep); }
export function FontFactory(dep: HttpService) { return new Models.Font(dep); }
export function ViewerFactory(dep: HttpService) { return new Models.Viewer(dep); }
export function GiveawayFactory(dep: HttpService) { return new Models.Giveaway(dep); }
export function ViewerAccountFactory(dep: HttpService) { return new Models.ViewerAccount(dep); }

@NgModule({
    providers: [
        { provide: Models.Account, useFactory: AccountFactory, deps: [HttpService] },
        { provide: Models.Channel, useFactory: ChannelFactory, deps: [HttpService] },
        { provide: Models.Statistics, useFactory: StatisticsFactory, deps: [HttpService] },
        { provide: Models.Follower, useFactory: FollowerFactory, deps: [HttpService] },
        { provide: Models.Subscriber, useFactory: SubscriberFactory, deps: [HttpService] },
        { provide: Models.Invite, useFactory: InviteFactory, deps: [HttpService] },
        { provide: Models.Permission, useFactory: PermissionFactory, deps: [HttpService] },
        { provide: Models.Service, useFactory: ServiceFactory, deps: [HttpService] },
        { provide: Models.Goal, useFactory: GoalFactory, deps: [HttpService] },
        { provide: Models.Quote, useFactory: QuoteFactory, deps: [HttpService] },
        { provide: Models.Command, useFactory: CommandFactory, deps: [HttpService] },
        { provide: Models.Message, useFactory: MessageFactory, deps: [HttpService] },
        { provide: Models.Settings, useFactory: SettingsFactory, deps: [HttpService] },
        { provide: Models.Twitter, useFactory: TwitterFactory, deps: [HttpService] },
        { provide: Models.Website, useFactory: WebsiteFactory, deps: [HttpService] },
        { provide: Models.Filter, useFactory: FilterFactory, deps: [HttpService] },
        { provide: Models.Rank, useFactory: RankFactory, deps: [HttpService] },
        { provide: Models.Boost, useFactory: BoostFactory, deps: [HttpService] },
        { provide: Models.TimedMessage, useFactory: TimedMessageFactory, deps: [HttpService] },
        { provide: Models.Warning, useFactory: WarningFactory, deps: [HttpService] },
        { provide: Models.Panel, useFactory: PanelFactory, deps: [HttpService] },
        { provide: Models.Points, useFactory: PointsFactory, deps: [HttpService] },
        { provide: Models.OAuthApplication, useFactory: OAuthApplicationFactory, deps: [HttpService] },
        { provide: Models.Tip, useFactory: TipFactory, deps: [HttpService] },
        { provide: Models.Authorization, useFactory: AuthorizationFactory, deps: [HttpService] },
        { provide: Models.Platform, useFactory: PlatformFactory, deps: [HttpService] },
        { provide: Models.Session, useFactory: SessionFactory, deps: [HttpService] },
        { provide: Models.Tipper, useFactory: TipperFactory, deps: [HttpService] },
        { provide: Models.Integration, useFactory: IntegrationFactory, deps: [HttpService] },
        { provide: Models.Font, useFactory: FontFactory, deps: [HttpService] },
        { provide: Models.Viewer, useFactory: ViewerFactory, deps: [HttpService] },
        { provide: Models.Giveaway, useFactory: GiveawayFactory, deps: [HttpService] },
        { provide: Models.ViewerAccount, useFactory: ViewerAccountFactory, deps: [HttpService] },
    ]
})
export class FrontendCommonModule {

}
