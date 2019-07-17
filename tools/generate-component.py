# CREATE ATOMIC COMPONENT AUTOMATICALLY
# arg1: type
# arg2: component_name
# arg3~: targets
import sys
import os, os.path
import re


def find_bracket(lines, bracket_open, bracket_close, row, column):
    # bracket_open is one of ['(', '[', '{', '<']
    # bracket_close is pair bracket of bracket_open
    # row and column is the location of starting bracket_open in lines
    i = row
    while (i < len(lines)):
        j = 0
        if i == row:
            j = column + 1
        line = lines[i]
        while (j < len(line)):
            c = line[j]
            if c == bracket_open:
                i, j = find_bracket(lines, bracket_open, bracket_close, i, j);
                line = lines[i]
                j += 1
                continue
            if c == bracket_close:
                return i, j
            j += 1
        i += 1
    return i, j


def get_inner_path(path):
    ret = path
    ret = ret.replace('./src/components/', '')
    ret = ret.replace('src/components/', '')
    ret = ret.replace('./src/', '')
    ret = ret.replace('src/', '')
    return ret


def get_outter_dir(path):
    ret = path
    ret = ret.replace('./src/', '')
    ret = ret.replace('src/', '')
    ret = ret.split('/')[0]
    return ret


container = ""
targets = sys.argv[3] if len(sys.argv) > 3 else 'rsyt'  # ex) * or rsytc (react, styled, story, test, container)
outter_dir = sys.argv[1]  # one of ['atoms', 'molecules', 'organisms', templates', 'pages']
file_name = sys.argv[2]  # capitalized ex) Button
file_name_nc = file_name[0].lower() + file_name[1:]  # non capitalized ex) teamCreateModal
dir_url = outter_dir + "/" + file_name  # ex) atoms/Button
dir_path = "src/components/" + dir_url  # ex) src/components/atoms/Button
full_path = dir_path + '/' + file_name

# file paths
files_path = {
    'index': dir_path + '/index.js',
    'js': full_path + '.js',
    'container': full_path + '.container.js',
    'styled': full_path + '.styled.js',
    'props': full_path + '.props.js',
    'story': full_path + '.stories.js',
    'test': full_path + '.test.js',
}


# templates
def index_js_template():
    lines = []
    if 'c' in targets or '*' in targets:
        lines.append('export { default } from "./%s.container"' % (file_name))
    else:
        lines.append('export { default } from "./%s"' % (file_name))
    return '\n'.join(lines)


def component_js_template():
    lines = []

    lines.append('import React, { PureComponent } from "react"')
    lines.append('import PropTypes from "prop-types"')
    lines.append('')
    lines.append('import %sWrapper from "./%s.styled"' % (file_name, file_name))
    lines.append('')
    lines.append('class %s extends PureComponent {' % (file_name))
    lines.append('	render() {')
    lines.append('		return (')
    lines.append('			<%sWrapper>' % (file_name))
    lines.append('				{this.props.children}')
    lines.append('				%s' % (file_name))
    lines.append('			</%sWrapper>' % (file_name))
    lines.append('		)')
    lines.append('	}')
    lines.append('}')

    lines.append('')
    lines.append("%s.propTypes = {" % (file_name))
    lines.append("}")
    lines.append("")
    lines.append("%s.defaultProps = {" % (file_name))
    lines.append("}")
    lines.append("")
    lines.append('export default %s' % (file_name))
    return '\n'.join(lines)


def container_template():
    lines = []
    lines.append('import React, { PureComponent } from "react"')
    lines.append('import { connect } from "react-redux"')
    lines.append('')
    lines.append('import %s from "./%s"' % (file_name, file_name))
    lines.append('import toJS from "hoc/toJS"')
    lines.append('')
    lines.append('class %sContainer extends PureComponent {' % (file_name))
    lines.append('	render() {')
    lines.append('		return (')
    lines.append('			<%s {...this.props} />' % (file_name))
    lines.append('		)')
    lines.append('	}')
    lines.append('}')
    lines.append('')
    lines.append('const mapStateToProps = (state) => {')
    lines.append('	return {')
    lines.append('')
    lines.append('	}')
    lines.append('}')
    lines.append('')
    lines.append('const mapDispatchToProps = (dispatch) => {')
    lines.append('	return {')
    lines.append('')
    lines.append('	}')
    lines.append('}')
    lines.append('')
    lines.append('export default connect(')
    lines.append('	mapStateToProps,')
    lines.append('	mapDispatchToProps')
    lines.append(')(toJS(%sContainer))' % (file_name))
    return '\n'.join(lines)


def component_style_template():
    lines = []
    lines.append('import styled from "styled-components"')
    lines.append('')
    lines.append('const %sWrapper = styled.div`' % (file_name))
    lines.append('`')
    lines.append('')
    lines.append('export default %sWrapper' % (file_name))
    return '\n'.join(lines)



def story_template():
    lines = []
    lines.append('import React from "react"')
    lines.append('import { storiesOf } from "@storybook/react"')
    lines.append('')
    lines.append('import %s from "./index"' % (file_name))
    lines.append('')
    lines.append('storiesOf("%s/%s", module).add(' % (outter_dir, file_name))
    lines.append('	"Default",')
    lines.append('	() => (')
    lines.append('		<%s />' % (file_name))
    lines.append('	), {')
    lines.append('		notes: ""')
    lines.append('	}')
    lines.append(')')
    return '\n'.join(lines)


# directory generator
if not os.path.exists(dir_path):
    print('Generating Direction...')
    os.makedirs(dir_path)

print('Generating Templates...')
# templateFile generator
if 'r' in targets or 'c' in targets or '*' in targets:
    file_w = open(files_path['index'], 'w')
    file_w.write(index_js_template())
    file_w.close()

if 'r' in targets or '*' in targets:
    file_w = open(files_path['js'], 'w')
    file_w.write(component_js_template())
    file_w.close()

if 'c' in targets or '*' in targets:
    file_w = open(files_path['container'], 'w')
    file_w.write(container_template())
    file_w.close()

if 's' in targets or '*' in targets:
    file_w = open(files_path['styled'], 'w')
    file_w.write(component_style_template())
    file_w.close()

if 'y' in targets or '*' in targets:
    file_w = open(files_path['story'], 'w')
    file_w.write(story_template())
    file_w.close()


print(file_name)
