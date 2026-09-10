{
  "targets": [
    {
      "target_name": "sqlanywhere",
      "defines": [ '_SACAPI_VERSION=5', 'DRIVER_NAME=sqlanywhere' ],
      "sources": [ "src/sqlanywhere.cpp",
		   "src/utils.cpp",
		   "src/sacapidll.cpp", ],

      "include_dirs": [
        "src/h",
        "<!(node -e \"require('nan')\")",
      ],

      # Electron's common.gypi defines both V8_DEPRECATION_WARNINGS and
      # USING_V8_SHARED, so deprecated V8 classes expand to
      #   class [[deprecated("...")]] __attribute__((visibility("default"))) Value
      # Older GCC (seen on the ubuntu-22.04-arm CI runner) rejects a GNU attribute
      # that follows a C++11 attribute in a class head, failing with
      # "expected identifier before '__attribute__'". Newer GCC accepts it, which is
      # why this only reproduces on the older distro toolchains.
      # gyp emits defines before cflags, so -U here wins over the -D from common.gypi.
      # This only suppresses the deprecation attributes; it changes no ABI or behaviour.
      'conditions': [
        ['OS!="win"', {
          'cflags_cc': [
            '-UV8_DEPRECATION_WARNINGS',
            '-UV8_IMMINENT_DEPRECATION_WARNINGS',
          ],
        }],
      ],

      'configurations': {
	'Release': {
	  'msvs_settings': {
            'VCCLCompilerTool': {
              'ExceptionHandling': 1
            }
	  }
	}
      }	
    }
  ]
}
