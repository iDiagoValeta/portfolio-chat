"""Contrato de arquitectura: el núcleo y el puerto no dependen de red, HTTP ni adaptadores.

Lee .hexagonal.json y analiza los imports con ast, sin dependencias externas.
"""

import ast
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = json.loads((ROOT / '.hexagonal.json').read_text(encoding='utf-8'))
ADAPTERS = [Path(p).with_suffix('').as_posix().replace('/', '.') for p in CONFIG['driving_adapters'] + CONFIG['driven_adapters']]


def imported_modules(source: str) -> set[str]:
    modules = set()
    for node in ast.walk(ast.parse(source)):
        if isinstance(node, ast.Import):
            modules.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            modules.add(node.module)
    return modules


def violations(source: str) -> list[str]:
    forbidden = CONFIG['forbidden_in_core'] + ADAPTERS
    return sorted(m for m in imported_modules(source) for f in forbidden if m == f or m.startswith(f + '.'))


class ArchitectureContractTest(unittest.TestCase):
    def test_core_and_ports_do_not_import_infrastructure_or_adapters(self):
        for path in CONFIG['core'] + CONFIG['ports']:
            with self.subTest(path=path):
                self.assertEqual(violations((ROOT / path).read_text(encoding='utf-8')), [])

    def test_the_contract_catches_a_violation(self):
        # Si el contrato no detecta esto, el test anterior sería un falso verde
        self.assertEqual(violations('import urllib.request\nfrom portfolio.web import serve\n'), ['portfolio.web', 'urllib.request'])

    def test_adapters_are_only_built_in_the_composition_root(self):
        for path in ROOT.glob('portfolio/*.py'):
            with self.subTest(path=path.name):
                self.assertNotIn('DeepSeekChatModel(', path.read_text(encoding='utf-8').replace('class DeepSeekChatModel', ''))


if __name__ == '__main__':
    unittest.main()
