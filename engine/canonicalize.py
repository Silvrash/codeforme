from __future__ import print_function
import re
import ast
import astor
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


class Canonicalize(object):
    """
    canonicalize the query, replace strings to a special place holder
    """
    QUOTED_STRING_RE = re.compile(r"(?P<quote>['\"`])(?P<string>.*?)(?<!\\)(?P=quote)")

    @classmethod
    def canonicalize_intent(cls, intent):
        # type: (str) -> (str, list, dict)
        str_matches = cls.QUOTED_STRING_RE.findall(intent)
        str_map = dict()
        str_count = 0
        cur_replaced_strs = set()

        for match in str_matches:
            str_literal = match[0] + match[1] + match[0]

            if str_literal in cur_replaced_strs:
                continue
            if str_literal in ['\'%s\'', '\"%s\"']:
                continue

            str_repr = '_VAR%d_' % str_count
            str_map[str_literal.replace("'", "").replace("`", "").replace("\"", "")] = str_repr

            intent = intent.replace(str_literal, str_repr)
            str_count += 1
        return intent, str_map if str_map else {}

    @staticmethod
    def replace_strings_in_ast(py_ast, string2slot):
        for node in ast.walk(py_ast):
            for k, v in list(vars(node).items()):
                if k in ('lineno', 'col_offset', 'ctx'):
                    continue

                if isinstance(v, str):
                    if v in string2slot:
                        val = string2slot[v]
                        setattr(node, k, val)
                    else:
                        str_key = v
                        if str_key in string2slot:
                            val = string2slot[str_key]
                            if isinstance(val, str):
                                try:
                                    val = str(val).encode('ascii')
                                except:
                                    pass
                            setattr(node, k, val)

    @staticmethod
    def cononicalize_code(code, slot_map):
        try:
            string2slot = {x[1]: x[0] for x in list(slot_map.items())}
            py_ast = ast.parse(code)
            Canonicalize.replace_strings_in_ast(py_ast, string2slot)
            normalized_code = astor.to_source(py_ast)
        except:
            normalized_code = code
        return normalized_code

    @staticmethod
    def decanonicalize_code(code, slot_map):
        try:
            slot2string = {x[0]: x[1] for x in list(slot_map.items())}
            py_ast = ast.parse(code)
            Canonicalize.replace_strings_in_ast(py_ast, slot2string)
            raw_code = astor.to_source(py_ast)
            return raw_code.strip()
        except:
            return code
