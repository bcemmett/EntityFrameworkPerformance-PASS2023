CREATE TABLE [dbo].[OrderLineItems]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[OrderId] [int] NOT NULL,
[ProductId] [int] NOT NULL,
[UnitPrice] [money] NOT NULL,
[Quantity] [int] NOT NULL,
[DiscountRate] [decimal] (3, 3) NULL,
[PricePaid] [money] NOT NULL
)
GO
ALTER TABLE [dbo].[OrderLineItems] ADD CONSTRAINT [PK_OrderLineItems] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_OrderId] ON [dbo].[OrderLineItems] ([OrderId]) INCLUDE ([Id], [ProductId], [Quantity], [DiscountRate], [PricePaid], [UnitPrice])
GO
ALTER TABLE [dbo].[OrderLineItems] ADD CONSTRAINT [FK_OrderLineItems_Orders] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders] ([Id])
GO
ALTER TABLE [dbo].[OrderLineItems] ADD CONSTRAINT [FK_OrderLineItems_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id])
GO
