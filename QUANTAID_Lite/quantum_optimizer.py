from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit.algorithms import QAOA
from qiskit import Aer
import networkx as nx

def quantum_route_optimizer():
    G = nx.Graph()
    G.add_weighted_edges_from([
        (0,1,10), (0,2,15), (0,3,20),
        (1,2,35), (1,3,25),
        (2,3,30)
    ])

    qp = QuadraticProgram("tsp")
    for i in range(4):
        qp.binary_var(name=f"x_{i}")

    qp.minimize(linear={f"x_{i}": i+1 for i in range(4)})

    backend = Aer.get_backend("aer_simulator")
    qaoa = QAOA(reps=1, quantum_instance=backend)
    optimizer = MinimumEigenOptimizer(qaoa)
    result = optimizer.solve(qp)
    print("Quantum optimized route:", result)
