CREATE TABLE [dbo].[PaymentCards]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[AccountId] [int] NOT NULL,
[Created] [datetime] NOT NULL,
[NickName] [nvarchar] (100) NULL,
[CardType] [nvarchar] (10) NOT NULL,
[CardNumber] [nvarchar] (20) NOT NULL,
[StartDate] [nvarchar] (5) NULL,
[ExpiryDate] [nvarchar] (5) NOT NULL,
[Cvc] [nvarchar] (3) NULL
)
GO
ALTER TABLE [dbo].[PaymentCards] ADD CONSTRAINT [PK_PaymentCards] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_PaymentCards_AccountId] ON [dbo].[PaymentCards] ([AccountId]) INCLUDE ([Id], [Created], [NickName], [CardType], [CardNumber], [StartDate], [ExpiryDate], [CVC])
GO
ALTER TABLE [dbo].[PaymentCards] ADD CONSTRAINT [FK_PaymentCards_Accounts] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id])
GO
