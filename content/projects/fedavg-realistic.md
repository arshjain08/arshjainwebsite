# Federated Learning Under Realistic Imperfections

Built a PyTorch simulator to see how FedAvg holds up when the real world gets messy: non-IID data, partial participation, and asynchronous client updates. I implemented synchronous and asynchronous FedAvg with explicit staleness tracking, modeled client delays and dropouts inside a configurable loop, and ran MNIST and CIFAR-100 experiments to measure how drift and stale updates interact.

The setup used 100 simulated clients with 10% active each round, Dirichlet splits (alpha 0.5 and 0.3), availability dropping to 60%, and delays up to 15 rounds to mirror deployment variance. MNIST stayed stable at 95%+ accuracy across all settings. CIFAR-100 fell from roughly 57% (IID, synchronous) to ~47% under non-IID data and collapsed to ~8-18% when non-IID data combined with asynchronous updates, showing how client drift and staleness compound and where vanilla FedAvg breaks down.
