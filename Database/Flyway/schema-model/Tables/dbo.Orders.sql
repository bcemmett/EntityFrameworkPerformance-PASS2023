CREATE TABLE [dbo].[Orders]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[AccountId] [int] NOT NULL,
[RestaurantId] [int] NOT NULL,
[TimeReceived] [datetime] NOT NULL,
[TimeAccepted] [datetime] NULL,
[TimeDispatched] [datetime] NULL,
[TimeDelivered] [datetime] NULL,
[SubTotal] [money] NOT NULL,
[TaxCharged] [money] NOT NULL,
[Total] [money] NOT NULL,
[TimeRefunded] [datetime] NULL,
[RestaurantNotes] [nvarchar] (2000) NULL,
[VoucherCode] [nvarchar] (10) NULL
)
GO
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_Orders_AccountId] ON [dbo].[Orders] ([AccountId])
GO
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [FK_Orders_Accounts] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id])
GO
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [FK_Orders_Restaurants] FOREIGN KEY ([RestaurantId]) REFERENCES [dbo].[Restaurants] ([Id])
GO
